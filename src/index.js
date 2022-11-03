import ContactManager from "./Manager/index.js";

const manager = new ContactManager();

manager.addContactMany([
  {
    firstName: "Dheeraj",
    lastName: "Bisht",
    phone: "+918273205016",
  },
  {
    firstName: "Robin",
    lastName: "",
    phone: "+918284695111",
  },
  {
    firstName: "Mukesh",
    lastName: "Bisht",
    phone: "+918273205016",
  },
  {
    firstName: "Robor",
    lastName: "Bisht",
    phone: "+918273205016",
  },
]);

const res = manager.searchContact({
  field: "LAST_NAME",
  search: "bish",
  partial: true,
});

console.log(res);
