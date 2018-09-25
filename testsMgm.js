const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

const showableName = str => str.split(".")[0];
const storeableName = str => str + ".json";

const basePath = "./tests/";
const get = async name => {
  if (name) {
    return JSON.parse(await readFile(`${basePath}/${storeableName(name)}`));
  } else {
    const files = await readdir(basePath);
    return files.map(showableName);
  }
};

const save = async (name, data) => {
  return await writeFile(
    `${basePath}/${storeableName(name)}`,
    JSON.stringify(data)
  );
};

const elements = async data => {
  const fileName = `./elements/elements.json`;
  if (data) {
    return await writeFile(`fileName`, JSON.stringify(data));
  }
  return JSON.parse(await readFile(fileName));
};
module.exports = {
  get,
  save,
  elements
};
