const { loadContacts, saveContacts } = require("../utils/fileUtils")
const { addContact, deleteContact, searchContacts } = require("../services/contactService")
const fs = require("fs")

function handleCommand(args) {
  const command = args[2]
  const filePath = "contacts.json"
  const contacts = loadContacts(filePath)

  try {
    switch (command) {
      case "add":
        const [name, email, phone] = args.slice(3)
        if (!name || !email || !phone) throw new Error("Missing arguments for add command")
        addContact(contacts, name, email, phone)
        break

      case "list":
        console.log("\n=== All Contacts ===")
        contacts.forEach((c, i) => {
          console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`)
        })
        return

      case "search":
        const query = args[3]
        const results = searchContacts(contacts, query || "")
        if (results.length === 0) console.log(`No contacts found matching "${query}"`)
        else {
          console.log(`\n=== Search Results for "${query}" ===`)
          results.forEach((c, i) => {
            console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`)
          })
        }
        return

      case "delete":
        const emailToDelete = args[3]
        deleteContact(contacts, emailToDelete)
        break

      case "help":
        console.log(`
Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"
  list
  search "query"
  delete "email"
  help`)
        return

      default:
        throw new Error(`Unknown command '${command}'`)
    }

    saveContacts(filePath, contacts)
  } catch (err) {
    console.log("✗ Error:", err.message)
  }
}

module.exports = { handleCommand }
