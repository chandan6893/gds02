const ContactModal = require("../Modal/Contactus");

class Contact {
  async AddContact(req, res) {
    try {
      const { name, phone, email, message } = req.body;
      const Contact = new ContactModal({ name, phone, email, message });
      let savedContact = await Contact.save();
      if (savedContact) {
        return res.status(200).json({
          message: "Contact added successfully",
          Contact: savedContact,
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async Update(req, res) {
    let id = req.params.id;
    try {
      const { name, phone, email, message } = req.body;

      const finduser = await ContactModal.findOne({ _id: id });

      if (!finduser) {
        return res.status(404).json({ error: "User not found" });
      }

      finduser.name = name || finduser.name;
      finduser.phone = phone || finduser.phone;
      finduser.email = email || finduser.email;
      finduser.message = message || finduser.message;

      const updatedUser = await ContactModal.findOneAndUpdate(
        { _id: id }, 
        { $set: finduser }, 
        { new: true } 
      );

      res
        .status(200)
        .json({ message: "User updated successfully", data: updatedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async GetData(req, res) {
    try {
      const Contact = await ContactModal.find({});
      res.status(200).json(Contact);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async Trash(req, res) {
    try {
      const { id } = req.params;
      await ContactModal.findByIdAndDelete(id);
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
const ContactController = new Contact();
module.exports = ContactController;
