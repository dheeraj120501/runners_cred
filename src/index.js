import * as fs from "fs";
import ContactManager from "./Manager/index.js";

const manager = new ContactManager();

// manager.addContactMany([
//   {
//     firstName: "Dheeraj",
//     lastName: "Bisht",
//     phone: "+918273205016",
//   },
//   {
//     firstName: "Robin",
//     lastName: "",
//     phone: "+918-284695111",
//   },
//   {
//     firstName: "Mukesh",
//     lastName: "Bisht",
//     phone: "+918273205016",
//   },
//   {
//     firstName: "Robor",
//     lastName: "Bisht",
//     phone: "+918273205016",
//   },
// ]);

// const res = manager.searchContact({
//   field: "LAST_NAME",
//   search: "bi",
//   partial: true,
// });

// console.log(res);

const callback = (data) => {
  for (let i = 0; i < data.length; i++) {
    const firstName = data[i][0];
    const phone = [
      data[i][2].split(" ")[0],
      data[i][2].split(" ")[1].split("-").join(""),
    ].join("");
    const lastName = data[i][1];

    // console.log({
    //   firstName,
    //   phone,
    //   lastName,
    // });

    manager.addContact({
      firstName,
      phone,
      lastName,
    });
  }
};

const data = fs.readFileSync("src/data/data.csv", "utf8");
manager.addContactFromCsv(data, callback);
