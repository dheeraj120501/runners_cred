import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";

import Contact from "../Contact/index.js";
import { Trie } from "../utils/helpers.js";
import { FIELDS, sendRes } from "../utils/index.js";
class ContactManager {
  #contacts = {};

  #filterTable = {
    firstName: new Trie(),
    lastName: new Trie(),
    // phone: new Trie(),
  };

  constructor() {
    if (ContactManager._instance) {
      return ContactManager._instance;
    }
    ContactManager._instance = this;
  }

  /**
   *
   * @param {firstName, phone, lastName} param0
   * @returns ContactManager
   */
  addContact({ firstName, phone, lastName = "" } = {}) {
    const id = uuidv4();
    let newContact = new Contact({ firstName, lastName, phone, id });
    const prevContacts = this.#contacts;
    this.#contacts = { ...prevContacts, [id]: newContact };
    this.#filterTable.firstName.insert(firstName, id);
    this.#filterTable.lastName.insert(lastName, id);

    return this;
  }

  addContactMany(contacts) {
    try {
      if (!(contacts instanceof Array)) {
        throw new Error("You must pass a list of Contacts");
      }
      if (!contacts.length) {
        throw new Error("Incoming list must contain atleast one Contact");
      }
      contacts.map((contact) => {
        this.addContact(contact);
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  addContactFromCsv(csv, callback) {
    Papa.parse(csv, {
      complete: function ({ data }) {
        callback(data);
      },
    });
  }

  /**
   *
   * @param {field, search="", partial = false} param0
   * @returns {total, data}
   */
  searchContact({ field, search = "", partial = false } = {}) {
    try {
      if (!Object.keys(FIELDS).includes(field)) {
        throw new Error(
          "Invalid Field make sure the field is valid and non empty."
        );
      }

      const ids = this.#filterTable[FIELDS[field]].search(search, partial);

      const res = ids.map((id) => {
        return this.#contacts[id];
      });

      return sendRes(res);
    } catch (err) {
      console.log("Exception on search contacts:", err.message);
    }
  }
}

export default ContactManager;
