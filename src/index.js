import * as fs from "fs";
import ContactManager from "./Manager/index.js";
import { analyzeFunc, FIELDS } from "./utils/index.js";

const manager = new ContactManager();

const csv = fs.readFileSync("src/data/data.csv", "utf8");

// Asynchronous Code

// const callback = (data) => {

//   const res = analyzeFunc({
//     func: manager.searchContact.bind(manager),
//     args: [{ field: FIELDS.LAST_NAME, search: "Windler" }],
//     funcName: "Search Contacts",
//   });
//   console.log(res.total);
// };

// analyzeFunc({
//   func: manager.addContactFromCsv.bind(manager),
//   args: [csv, callback],
//   funcName: "Add Contact from csv",
// });

// Synchronous Code

analyzeFunc({
  func: manager.addContactFromCsvSync.bind(manager),
  args: [csv],
  funcName: "Add Contact from csv sync",
});

const res = analyzeFunc({
  func: manager.searchContact.bind(manager),
  args: [{ field: FIELDS.FIRST_NAME, search: "Ely" }],
  funcName: "Search Contacts",
});

console.log(res.total);
