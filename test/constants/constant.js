const MOCKING_API_URL = "https://mocking-api-project.netlify.app/";
const XPATH = {
  btnAddAPI: "//button[@class='content-button']",
  popupAddEdit: "//div[@class='popup']",
  popupTitle: "//h2[@class='popup-title']",
  tableHead: "//table[@class='content-table']//th",
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
};

module.exports = {
  MOCKING_API_URL,
  XPATH,
  UI_TEXT,
};
