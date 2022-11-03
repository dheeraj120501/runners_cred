// import { sampleDB as contacts } from "../Database/sampleDB.js";
import contacts from "../Database/contacts.json" assert { type: "json" };

const FIELDS = {
  FIRST: "first_name",
  LAST: "last_name",
  PHONE: "phone",
};

const sendRes = (data) => ({
  total: data.length,
  data,
});

/**
 *
 * @param {field, search, partial} param0
 * @returns []
 */
export const searchContact = ({ field, search = "", partial = false } = {}) => {
  try {
    if (!Object.keys(FIELDS).includes(field)) {
      throw new Error(
        "Invalid Field make sure the field is valid and non empty."
      );
    }

    if (search === "") {
      const result = contacts;
      return sendRes(result);
    }

    if (!partial) {
      const result = contacts.filter((contact) => {
        return contact[FIELDS[field]] === search;
      });
      return sendRes(result);
    }

    const regExpr = new RegExp(search, "gi");
    const result = contacts.filter((contact) => {
      return contact[FIELDS[field]].match(regExpr);
    });

    return sendRes(result);
  } catch (err) {
    console.log("Exception on search contacts:", err.message);
  }
};
