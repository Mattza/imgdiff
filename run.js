const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const unlinkFile = promisify(fs.unlink);

const tempFolder = "./temp";

const concat = async filename => {
    const fileDirs = await readdir(tempFolder);
    const proms = fileDirs.map(key => readFile(`${tempFolder}/${key}`));
    const files = await Promise.all(proms);
    const ret = files.map((steps, index) => ({
        testName: fileDirs[index].split(".")[0],
        steps: JSON.parse(steps),
    }));
    writeFile(filename, JSON.stringify({ tests: ret }, null, 4));
    await clean();
};

const clean = async () => {
    if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder);
    }
    const files = await readdir(tempFolder);
    const proms = files.map(key => unlinkFile(`${tempFolder}/${key}`));
    await Promise.all(proms);
};

const runFn = process.argv[2].slice(2);

let arguments = process.argv.slice(3).reduce((acc, item, index, array) => {
    if (!!(index % 2)) {
        const key = array[index - 1];
        acc[key] = item;
    }
    return acc;
}, {});

if (runFn === "clean") {
    clean();
}
if (runFn === "concat") {
    if (!arguments["-f"]) {
        console.error("Missing -f flag");
    }
    concat(arguments["-f"]);
}
