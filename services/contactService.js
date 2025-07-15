const { isValidEmail } = require("../utils/validation")

function addContact(contacts, name, email, phone) {
  if (!isValidEmail(email)) {
    throw new Error("Email must contain @ symbol")
  }

  if (contacts.find(c => c.email === email)) {
    throw new Error("Contact with this email already exists")
  }

  contacts.push({ name, email, phone })
  console.log(`✓ Contact added: ${name}`)
}

function deleteContact(contacts, email) {
  const index = contacts.findIndex(c => c.email === email)
  if (index === -1) {
    throw new Error(`No contact found with email: ${email}`)
  }
  const removed = contacts.splice(index, 1)[0]
  console.log(`✓ Contact deleted: ${removed.name}`)
}

function searchContacts(contacts, query) {
  return contacts.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase())
  )
}

module.exports = { addContact, deleteContact, searchContacts }
