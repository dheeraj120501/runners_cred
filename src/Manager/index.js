import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";
import TrieSearch from "trie-search/src/TrieSearch.js";

import Contact from "../Contact/index.js";
import { FIELDS, sendRes } from "../utils/index.js";
class ContactManager {
  #contacts = {};

  #filterTable = {
    firstName: new TrieSearch(),
    lastName: new TrieSearch(),
    phone: new TrieSearch(),
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
    this.#contacts[id] = newContact;

    this.#filterTable.firstName.map(firstName, id);
    this.#filterTable.lastName.map(lastName, id);

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

  addContactFromCsvSync(csv) {
    const { data } = Papa.parse(csv);
    return data;
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
      const ids = this.#filterTable[FIELDS[field]].search(search);

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
