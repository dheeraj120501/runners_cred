import { v4 as uuidv4 } from "uuid";

import Contact from "../Contact/index.js";
import { Trie } from "../utils/helpers.js";
import { FIELDS, sendRes } from "../utils/index.js";

class ContactManager {
  #contacts = {};

  #filterTable = {
    firstName: {},
    lastName: {},
    phone: {},
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
  addContact({ firstName, phone, lastName } = {}) {
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    const id = uuidv4();
    let newContact = new Contact({ firstName, lastName, phone, id });
    const prevContacts = this.#contacts;
    this.#contacts = { ...prevContacts, [id]: newContact };
    const prevFirstNames = this.#filterTable.firstName;
    this.#filterTable.firstName = {
      ...prevFirstNames,
      [firstName]: prevFirstNames[firstName]
        ? [...prevFirstNames[firstName], id]
        : [id],
    };
    const prevLastNames = this.#filterTable.lastName;
    this.#filterTable.lastName = {
      ...prevLastNames,
      [lastName]: prevLastNames[lastName]
        ? [...prevLastNames[lastName], id]
        : id,
    };
    const prevPhones = this.#filterTable.phone;
    this.#filterTable.phone = {
      ...prevPhones,
      [phone]: prevPhones[phone] ? [...prevPhones[phone], id] : id,
    };

    return this;
  }

  // addContactMany(contacts) {
  //   try {
  //     if (Object.getPrototypeOf(contacts).constructor !== Array) {
  //       throw new Error("You must pass a list of Contacts");
  //     }
  //     contacts.map((contact) => {
  //       this.addContact(contact);
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

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

      if (search === "") {
        const result = this.#contacts;
        return sendRes(result);
      }
      if (!partial) {
        const result = this.#filterTable[FIELDS[field]][search.toLowerCase()]
          ? this.#filterTable[FIELDS[field]][search.toLowerCase()].map((id) => {
              return this.#contacts[id];
            })
          : [];
        return sendRes(result);
      }

      const regExpr = new RegExp(search, "gi");
      const result = Object.values(this.#contacts).filter((contact) => {
        return contact[FIELDS[field]].match(regExpr);
      });

      return sendRes(result);
    } catch (err) {
      console.log("Exception on search contacts:", err.message);
    }
  }
}

class ContactManagerTrie {
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
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    const id = uuidv4();
    let newContact = new Contact({ firstName, lastName, phone, id });
    const prevContacts = this.#contacts;
    this.#contacts = { ...prevContacts, [id]: newContact };

    this.#filterTable.firstName.insert(firstName, id);
    this.#filterTable.lastName.insert(lastName, id);

    return this;
  }

  // addContactMany(contacts) {
  //   try {
  //     if (Object.getPrototypeOf(contacts).constructor !== Array) {
  //       throw new Error("You must pass a list of Contacts");
  //     }
  //     contacts.map((contact) => {
  //       this.addContact(contact);
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

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

export { ContactManager, ContactManagerTrie };
