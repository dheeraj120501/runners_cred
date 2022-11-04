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
    // console.log(phone.slice(1));

    this.#filterTable.firstName.map(firstName, id);
    this.#filterTable.lastName.map(lastName, id);
    this.#filterTable.phone.map(phone.slice(1), id);

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
        for (let i = 0; i < data.length; i++) {
          const firstName = data[i][0];
          const phone = [
            data[i][2].split(" ")[0],
            data[i][2].split(" ")[1].split("-").join(""),
          ].join("");
          const lastName = data[i][1];
          const manager = new ContactManager();
          manager.addContact({
            firstName,
            phone,
            lastName,
          });
        }
        callback();
      },
    });
  }

  addContactFromCsvSync(csv) {
    const { data } = Papa.parse(csv);
    for (let i = 0; i < data.length; i++) {
      const firstName = data[i][0];
      const phone = [
        data[i][2].split(" ")[0],
        data[i][2].split(" ")[1].split("-").join(""),
      ].join("");
      const lastName = data[i][1];
      const manager = new ContactManager();
      manager.addContact({
        firstName,
        phone,
        lastName,
      });
    }
  }

  /**
   *
   * @param {field, search="", partial = false} param0
   * @returns {total, data}
   */
  searchContact({ field, search = "", partial = false } = {}) {
    try {
      if (!Object.values(FIELDS).includes(field)) {
        throw new Error(
          "Invalid Field make sure the field is valid and non empty."
        );
      }
      const ids = this.#filterTable[field].search(search);

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
