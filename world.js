const puppeteer = require("puppeteer");
const { setWorldConstructor } = require("cucumber");
const settings = require("./imgdiff.json");

const { compare, setup } = require("./compare");

class ImgDiffWorld {
  constructor(args) {
    //TODO: Persistant browser?
    this.projectName = settings.project;
    setup(this.projectName);
    this.imgIndex = 0;
  }

  async startPage() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async closePage() {
    await this.browser.close();
  }

  async setBasicAuth({ username, password }) {
    await this.page.authenticate({ username, password });
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.waitfor(selector);
    await this.page.click(selector);
  }

  async sendkeys(selector, keys, clear) {
    await this.waitfor(selector);
    if (clear) {
      await this.page.click(selector, {
        clickCount: 1
      });
      await this.page.keyboard.down("Control");
      await this.page.keyboard.press("A");
      await this.page.keyboard.up("Control");
      await this.page.keyboard.press("Backspace");
    }

    await this.page.type(selector, keys);
  }

  async screenshot(screenshotName, element) {
    await this.waitfor(1500);
    const filename = `${this.getFullTestName()}.${this
      .imgIndex++}.${screenshotName}.png`;
    const fullPath = `./current/${filename}`;

    await this.page.screenshot({
      path: fullPath,
      fullPage: true
    });
    const faultyPixels = await compare(filename).catch(err => {
      throw "comparator failed " + err;
    });
    if (faultyPixels > 0) {
      throw "Fel i bilden: " + filename;
    }
  }

  setScenarioName(scenarioName) {
    this.scenarioName = scenarioName;
  }

  setTestName(testName) {
    this.testName = testName;
  }

  getFullTestName() {
    return (
      this.projectName +
      "/" +
      [this.scenarioName, this.testName].reduce(
        (fullName, name) => (fullName += name ? `-${this.testName}` : "")
      )
    );
  }

  async waitfor(selector, isElementSelector) {
    await this.page.waitFor(selector, {
      timeout: 15000
    });
  }
}

setWorldConstructor(ImgDiffWorld);
