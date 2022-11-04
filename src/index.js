import * as fs from "fs";
import ContactManager from "./Manager/index.js";
import { analyzeFunc } from "./utils/index.js";

const manager = new ContactManager();

const csv = fs.readFileSync("src/data/data.csv", "utf8");

// Asynchronous Code

// const callback = (data) => {
//   for (let i = 0; i < data.length; i++) {
//     const firstName = data[i][0];
//     const phone = [
//       data[i][2].split(" ")[0],
//       data[i][2].split(" ")[1].split("-").join(""),
//     ].join("");
//     const lastName = data[i][1];

//     manager.addContact({
//       firstName,
//       phone,
//       lastName,
//     });
//   }

//   const res = analyzeFunc({
//     func: manager.searchContact.bind(manager),
//     args: [{ field: "LAST_NAME", search: "Windler" }],
//     funcName: "Search Contacts",
//   });
//   console.log(res);

//   // const res = manager.searchContact({ field: "LAST_NAME", search: "Windler" });
//   // console.log(res);
// };

// analyzeFunc({
//   func: manager.addContactFromCsv,
//   args: [csv, callback],
//   funcName: "Add Contact from csv",
// });

// Synchronous Code
const data = analyzeFunc({
  func: manager.addContactFromCsvSync,
  args: [csv],
  funcName: "Add Contact from csv sync",
});

for (let i = 0; i < data.length; i++) {
  const firstName = data[i][0];
  const phone = [
    data[i][2].split(" ")[0],
    data[i][2].split(" ")[1].split("-").join(""),
  ].join("");
  const lastName = data[i][1];

  manager.addContact({
    firstName,
    phone,
    lastName,
  });
}

const res = analyzeFunc({
  func: manager.searchContact.bind(manager),
  args: [{ field: "LAST_NAME", search: "Windler" }],
  funcName: "Search Contacts",
});
console.log(res);

// const res = manager.searchContact({ field: "LAST_NAME", search: "Windler" });
// console.log(res);
