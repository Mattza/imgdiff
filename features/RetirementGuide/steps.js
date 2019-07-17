// features/browser/steps.js
const { Before, After, And, But, Given, Then, When } = require("cucumber");

Before(async function(scenario) {
  // this.setProjectName("Roadworks");
  this.setScenarioName(scenario.pickle.name);
  await this.startPage();
});

After(async function() {
  // this.createFile();
  await this.closePage();
});

When("go to {string}", async function(url) {
  await this.goto(url);
});

Then("take screenshot {string}", async function(desc) {
  await this.screenshot(desc, "retirement-planning.main");
});
