const fs = require("fs");
const { promisify } = require("util");
const fsMakeDir = promisify(fs.mkdir);
const PNG = require("pngjs").PNG;
const pixelmatch = require("pixelmatch");

const readImg = path =>
  new Promise((res, rej) => {
    const img = fs
      .createReadStream(path)
      .on("error", rej)
      .on("err", rej)
      .pipe(new PNG())
      .on("parsed", _ => {
        res(img);
      });
  });

module.exports = {
  setup: async projectName => {
    const opt = { recursive: true };
    await fsMakeDir(`./baseline/${projectName}`, opt);
    await fsMakeDir(`./current/${projectName}`, opt);
    await fsMakeDir(`./diff/${projectName}`, opt);
  },
  compare: async filename => {
    console.log("pling");

    const baselinePath = `baseline/${filename}`;
    const currentPath = `current/${filename}`;
    const diffPath = `diff/${filename}`;

    const currentImg = await readImg(currentPath).catch(err => {
      console.error(`Hittade inte bilden ${path}`);
    });
    console.log("mider");
    try {
      const baselineImg = (await readImg(baselinePath)).catch(err => {
        console.error(`Hittade inte baseline för ${baseline}`);
        return 0;
      });
    } catch (e) {
      console.log("JODO!; ", e);
      console.error(`Hittade inte baseline för ${baseline}`);
      return 0;
    }
    console.log("read", currentImg, baselineImg);

    if (!currentImg || !baselineImg) {
      return;
    }
    console.log("mid");

    var diff = new PNG({
      width: currentImg.width,
      height: currentImg.height
    });

    const pixelmatchOutput = pixelmatch(
      currentImg.data,
      baselineImg.data,
      diff.data,
      currentImg.width,
      currentImg.height,
      {
        threshold: 0.1
      }
    );

    diff.pack().pipe(fs.createWriteStream(diffPath));
    console.log("plong", pixelmatchOutput);
    return pixelmatchOutput;
  }
};
