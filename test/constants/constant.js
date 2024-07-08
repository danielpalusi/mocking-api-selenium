const MOCKING_API_URL = "https://mocking-api-project.netlify.app/";
const XPATH = {
  btnAddAPI: "//button[@class='content-button']",
  popupAddEdit: "//div[@class='popup']",
  popupTitle: "//h2[@class='popup-title']",
  tableHead: "//table[@class='content-table']//th",
  btnCopyURL: "//button[contains(@class,'button-copy')]",
  btnCopyCURL: "//button[contains(@class,'button-copyCURL')]",
  textAPI:
    "//button[contains(@class,'button-copy')]/parent::div/preceding-sibling::div",
  notification: "//div[contains(@class,'notification show')]",
  btnEditAPI: "//button[@data-id=1]",
  btnDeleteAPI: "//button[@data-id=65 and @class='delete']",
  // best practice: id using dynamic xpath, value from database
  inputNamePopup: "//input[@id='name']",
  selectMethodPopup: "//select[@id='method']",
  inputPathPopup: "//input[@id='path']",
  inputResponseCodePopup: "//input[@id='response-code']",
  textAreaRequestPopup: "//textarea[@id='request']",
  textAreaResponsePopup: "//textarea[@id='response']",
  btnAddAPIPopup: "//button[@class='popup-button__add']",
};
const UI_TEXT = {
  btnAddAPI: "Add API",
  tableTh: [
    "Name",
    "Method",
    "URL",
    "Response Code",
    "Request",
    "Response",
    "Action",
  ],
  notificationCopiedAPI: "Copied to clipboard",
  btnEditAPI: "Edit API",
  notificationRequiredFields: "Please fill in the required fields",
  notificationSuccess: "Success",
};

module.exports = {
  MOCKING_API_URL,
  XPATH,
  UI_TEXT,
};
