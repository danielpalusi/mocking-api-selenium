const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { MOCKING_API_URL, XPATH, UI_TEXT } = require("./constants/constant");
const { log } = require("console");

describe("User", function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  this.afterEach(async function () {
    await driver.quit();
  });

  it("Able to see Add API", async function () {
    await driver.navigate().to(MOCKING_API_URL);

    const btnAddAPI = await driver.findElement(By.xpath(XPATH.btnAddAPI));
    const elementText = await btnAddAPI.getText();

    assert.ok(elementText === UI_TEXT.btnAddAPI);
  });

  it("Able to click Add API button", async function () {
    await driver.navigate().to(MOCKING_API_URL);

    const btnAddAPI = await driver.findElement(By.xpath(XPATH.btnAddAPI));
    await btnAddAPI.click();

    const popup = await driver.findElement(By.xpath(XPATH.popupAddEdit));
    const popupTitle = await driver
      .findElement(By.xpath(XPATH.popupTitle))
      .getText();
    let displayValue = await popup.getCssValue("display");

    assert.ok(displayValue !== "none");
    console.log(popupTitle);
    assert.ok(popupTitle === UI_TEXT.btnAddAPI);
  });

  it("Able to see table column text", async function () {
    await driver.navigate().to(MOCKING_API_URL);

    const tableTh = await driver.findElements(By.xpath(XPATH.tableHead));
    tableTh.forEach(async (val, idx) =>
      assert.ok((await val.getText()) === UI_TEXT.tableTh[idx])
    );
  });
});
