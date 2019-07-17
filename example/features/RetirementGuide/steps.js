// features/browser/steps.js
const { Before, After, And, But, Given, Then, When } = require("cucumber");

Before(async function(scenario) {
  this.setScenarioName(scenario.pickle.name);
  await this.startPage();
});

After(async function() {
  await this.closePage();
});

When("go to {string}", async function(url) {
  await this.goto(url);
});

Then("take screenshot {string}", async function(desc) {
  await this.screenshot(desc, "retirement-planning.main");
});

Then("type {string} in {string}", async function(text, selector) {
  await this.sendkeys(selector, text, false);
});

Then("click {string}", async function(selector) {
  await this.click(selector);
});
