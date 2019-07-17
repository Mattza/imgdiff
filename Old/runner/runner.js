const puppeteer = require("puppeteer");
const fs = require("fs");
const { promisify } = require("util");
const { elements } = require("../testsMgm");
const writeFile = promisify(fs.writeFile);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
let ret = [];
const log = [];
const addToLog = (str, operator) => {
  console.log(str);
  log.push(str + ":" + JSON.stringify(operator));
  //writeFile(path, log.join("\n"));
};
const storeLogAsync = path => {
  writeFile(path, log.join("\n"));
};
async function run(test, options) {
  ret = [];
  addToLog("start");
  const browser = await puppeteer.launch(options);
  const testsProm = test.tests.map(async test => {
    const page = await browser.newPage();
    await asyncForEach(test.steps, async (element, stepIndex) => {
      if (!fs.existsSync("./img")) {
        fs.mkdirSync("./img");
      }
      if (!fs.existsSync("./img/" + test.testName)) {
        addToLog("skapar mappen" + "./img/" + test.testName);
        fs.mkdirSync("./img/" + test.testName);
      }
      addToLog(
        `${test.testName}: Step${stepIndex}, Operator:${element.operator}`
      );
      await actions[element.operator](page, element, test.testName);
      await actions.screenshot(
        page,
        {
          id: `step${stepIndex}`
        },
        test.testName
      );
    });
  });
  await Promise.all(testsProm);
  addToLog("done!");

  browser.close();
  return ret;
}

const getSelector = async operator => {
  if (operator.element) {
    const element = (await elements()).find(
      item => item.name === operator.element
    );
    return element["css-selector"];
  }
  return operator["css-selector"];
};

const actions = {
  go: async (page, operator, testName) => {
    return await page.goto(operator.url);
  },
  sendkey: async (page, operator, testName) => {
    const selector = await getSelector(operator);
    console.log("selector", selector);
    await actions.waitfor(page, operator);
    return await page.type(selector, operator.keys);
  },
  click: async (page, operator, testName) => {
    await actions.waitfor(page, operator);
    return await page.click(await getSelector(operator));
    addToLog("click done!");
  },
  waitfor: async (page, operator, testName) => {
    const waitfor =
      (operator.timeout && parseInt(operator.timeout, 10)) ||
      (await getSelector(operator));
    return await page.waitFor(waitfor);
  },
  screenshot: async (page, operator, testName) => {
    const path = `img/${testName}/${operator.id}.png`;
    ret.push(path);
    return await page.screenshot({
      path: "./" + path,
      fullPage: true
    });
  }
};

module.exports = run;
