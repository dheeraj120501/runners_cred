import ContactManager from "./Manager/index.js";

const manager = new ContactManager();

const res = manager.searchContact({
  field: "LAST_NAME",
  search: "B",
  partial: true,
});

console.log(res);
