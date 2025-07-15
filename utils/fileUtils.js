
const fs = require("fs")

function loadContacts(filepath) {
  try {
    const data = fs.readFileSync(filepath, "utf-8")
    return JSON.parse(data)
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("✗ File not found - creating new contact list")
      return []
    } else {
      console.log("✗ Error loading contacts:", err.message)
      return []
    }
  }
}

function saveContacts(filepath, contacts) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(contacts, null, 2))
    console.log("✓ Contacts saved to contacts.json")
  } catch (err) {
    console.log("✗ Error saving contacts:", err.message)
  }
}

module.exports = { loadContacts, saveContacts }
