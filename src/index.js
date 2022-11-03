import { searchContact } from "./Manager/index.js";

const res = searchContact({ field: "PHONE", search: "91", partial: true });
console.log(res);
