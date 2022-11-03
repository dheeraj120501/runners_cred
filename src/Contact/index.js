class Contact {
  constructor({ id, firstName, phone, lastName = "" } = {}) {
    try {
      if (!firstName || !phone) {
        throw new Error(
          "First name and phone number are required make sure you enter them."
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
