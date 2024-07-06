const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { MOCKING_API_URL } = require("./constants/constant");

describe("Using mocha", function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  this.afterEach(async function () {
    await driver.quit();
  });

  it("Find element", async function () {
    await driver.navigate().to(MOCKING_API_URL);

    const element = await driver.findElement(
      By.xpath("//button[@class='content-button']")
    );
    const elementText = await element.getText();

    assert.ok(elementText === "Add API");
  });
});
