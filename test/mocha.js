const { Builder, Browser, By, until } = require("selenium-webdriver");
const assert = require("assert");
const { MOCKING_API_URL, XPATH, UI_TEXT } = require("./constants/constant");

describe("User", function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.navigate().to(MOCKING_API_URL);
  });

  this.afterEach(async function () {
    await driver.quit();
  });

  it("Able to see Add API", async function () {
    const btnAddAPI = await driver.findElement(By.xpath(XPATH.btnAddAPI));
    const elementText = await btnAddAPI.getText();

    assert.ok(elementText === UI_TEXT.btnAddAPI);
  });

  it("Able to click Add API button", async function () {
    const btnAddAPI = await driver.findElement(By.xpath(XPATH.btnAddAPI));
    await btnAddAPI.click();

    const popup = await driver.findElement(By.xpath(XPATH.popupAddEdit));
    const popupTitle = await driver
      .findElement(By.xpath(XPATH.popupTitle))
      .getText();
    let displayValue = await popup.getCssValue("display");

    assert.ok(displayValue !== "none");
    assert.ok(popupTitle === UI_TEXT.btnAddAPI);
  });

  it("Able to see table column text", async function () {
    const tableTh = await driver.findElements(By.xpath(XPATH.tableHead));
    tableTh.forEach(async (val, idx) =>
      assert.ok((await val.getText()) === UI_TEXT.tableTh[idx])
    );
  });

  it("Able to copy URL from existing data", async function () {
    const btnCopyUrl = await driver.wait(
      until.elementLocated(By.xpath(XPATH.btnCopyURL), 1000)
    );
    await btnCopyUrl.click();
    const notificationText = await driver
      .wait(until.elementLocated(By.xpath(XPATH.notification), 1000))
      .getText();

    assert.ok(notificationText.includes(UI_TEXT.notificationCopiedAPI));
  });

  it("Able to copy CURL from existing data", async function () {
    const btnCopyUrl = await driver.wait(
      until.elementLocated(By.xpath(XPATH.btnCopyCURL), 1000)
    );
    await btnCopyUrl.click();
    const notificationText = await driver
      .wait(until.elementLocated(By.xpath(XPATH.notification), 1000))
      .getText();

    assert.ok(notificationText.includes(UI_TEXT.notificationCopiedAPI));
  });

  it("Able to edit existing data", async function () {
    const editData = driver.wait(
      until.elementLocated(By.xpath(XPATH.btnEditAPI), 1000)
    );
    await editData.click();
    const popupTitle = await driver
      .findElement(By.xpath(XPATH.popupTitle))
      .getText();

    assert.ok(popupTitle === UI_TEXT.btnEditAPI);
  });

  it("Able to delete existing data", async function () {
    const deleteData = driver.wait(
      until.elementLocated(By.xpath(XPATH.btnDeleteAPI), 1000)
    );

    await driver.wait(until.elementIsVisible(deleteData), 1000);

    await driver.executeScript(
      'arguments[0].scrollIntoView({ behavior: "smooth" });',
      deleteData
    );

    await deleteData.click();
    await driver.wait(until.stalenessOf(deleteData), 1000);
  });

  it("Unable to request API when required field is empty", async function () {
    const btnAddAPI = await driver.findElement(By.xpath(XPATH.btnAddAPI));
    await btnAddAPI.click();

    const inputName = await driver.findElement(By.xpath(XPATH.inputNamePopup));
    const selectPath = await driver.findElement(
      By.xpath(XPATH.selectMethodPopup)
    );
    const inputPath = await driver.findElement(By.xpath(XPATH.inputPathPopup));
    const inputResponseCode = await driver.findElement(
      By.xpath(XPATH.inputResponseCodePopup)
    );
    const inputRequest = await driver.findElement(
      By.xpath(XPATH.textAreaRequestPopup)
    );
    const inputResponse = await driver.findElement(
      By.xpath(XPATH.textAreaResponsePopup)
    );
    const btnAddPopup = await driver.findElement(
      By.xpath(XPATH.btnAddAPIPopup)
    );

    await driver.actions().sendKeys(inputName, "test").perform();
    const optionSelect = await selectPath.findElement(
      By.xpath(`//option[. = 'GET']`)
    );
    await optionSelect.click();
    await driver.actions().sendKeys(inputPath, "/test").perform();
    await driver.actions().sendKeys(inputResponseCode, "200").perform();
    await driver
      .actions()
      .sendKeys(inputRequest, `{"request": "request"}`)
      .perform();
    // await driver
    //   .actions()
    //   .sendKeys(inputResponse, "{'response': 'response'}")
    //   .perform();
    // response field is not filled
    await btnAddPopup.click();
    const notificationText = await driver
      .wait(until.elementLocated(By.xpath(XPATH.notification), 1000))
      .getText();

    assert.ok(notificationText.includes(UI_TEXT.notificationRequiredFields));
  });

  it("Able to request API when request field is empty", async function () {
    const btnAddAPI = await driver.findElement(By.xpath(XPATH.btnAddAPI));
    await btnAddAPI.click();

    const inputName = await driver.findElement(By.xpath(XPATH.inputNamePopup));
    const selectPath = await driver.findElement(
      By.xpath(XPATH.selectMethodPopup)
    );
    const inputPath = await driver.findElement(By.xpath(XPATH.inputPathPopup));
    const inputResponseCode = await driver.findElement(
      By.xpath(XPATH.inputResponseCodePopup)
    );
    const inputResponse = await driver.findElement(
      By.xpath(XPATH.textAreaResponsePopup)
    );
    const btnAddPopup = await driver.findElement(
      By.xpath(XPATH.btnAddAPIPopup)
    );

    await driver.actions().sendKeys(inputName, "test2").perform();
    const optionSelect = await selectPath.findElement(
      By.xpath(`//option[. = 'GET']`)
    );
    await optionSelect.click();
    await driver.actions().sendKeys(inputPath, "/test2").perform();
    await driver.actions().sendKeys(inputResponseCode, "200").perform();
    await driver
      .actions()
      .sendKeys(inputResponse, `{"response": "response"}`)
      .perform();

    await btnAddPopup.click();
    const notificationText = await driver
      .wait(until.elementLocated(By.xpath(XPATH.notification), 10000))
      .getText();

    assert.ok(notificationText.includes(UI_TEXT.notificationSuccess));
  });
});
