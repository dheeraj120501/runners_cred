class Contact {
  constructor({ id, firstName, phone, lastName = "" } = {}) {
    try {
      if (!firstName || !phone) {
        throw new Error(
          "First name and phone number are required make sure you enter them."
        );
      }
      if (!phone.match(/^\+[1-9]\d{1,14}$/)) {
        throw new Error(
          "Invalid Phone number make sure the phone number is in E.164 format."
        );
      }
      this._id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default Contact;
