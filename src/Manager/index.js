import Contact from "../Contact/index.js";
import { FIELDS, sendRes } from "../utils/index.js";

class ContactManager {
  #contacts = [
    new Contact({
      firstName: "Dheeraj",
      lastName: "Bisht",
      phone: "+918273205016",
    }),
    new Contact({
      firstName: "Robin",
      lastName: "",
      phone: "+918284695111",
    }),
    new Contact({
      firstName: "Mukesh",
      lastName: "Bisht",
      phone: "+918273205016",
    }),
    new Contact({
      firstName: "Robor",
      lastName: "Bisht",
      phone: "+9182732050174",
    }),
  ];

  constructor() {
    if (ContactManager._instance) {
      return ContactManager._instance;
    }
    ContactManager._instance = this;
  }

  searchContact({ field, search = "", partial = false } = {}) {
    try {
      if (!Object.keys(FIELDS).includes(field)) {
        throw new Error(
          "Invalid Field make sure the field is valid and non empty."
        );
      }

      if (search === "") {
        const result = this.#contacts;
        return sendRes(result);
      }

      if (!partial) {
        const result = this.#contacts.filter((contact) => {
          return contact[FIELDS[field]] === search;
        });
        return sendRes(result);
      }

      const regExpr = new RegExp(search, "gi");
      const result = this.#contacts.filter((contact) => {
        return contact[FIELDS[field]].match(regExpr);
      });

      return sendRes(result);
    } catch (err) {
      console.log("Exception on search contacts:", err.message);
    }
  }
}

export default ContactManager;
