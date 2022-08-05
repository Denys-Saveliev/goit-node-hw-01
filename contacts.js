const fs = require("fs/promises");
const tryCatchHandler = require("./tryCatchHandler");
const { resolve } = require("path");
const uniqid = require("uniqid");

const contactsPath = resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await tryCatchHandler(fs.readFile(contactsPath));
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await tryCatchHandler(listContacts());
  const contact = contacts.find(({ id }) => id === contactId);
  return !contact
    ? console.log(`Contact with id: ${contactId} is absent!`)
    : contact;
}

async function removeContact(contactId) {
  const contacts = await tryCatchHandler(listContacts());
  const newContacts = contacts.filter(({ id }) => id !== contactId);

  await tryCatchHandler(
    fs.writeFile(contactsPath, JSON.stringify(newContacts))
  );
  console.log(`Contact with id: ${contactId} was removed from contact list`);
}

async function addContact(name, email, phone) {
  const contacts = await tryCatchHandler(listContacts());
  const newContact = { id: uniqid(), name, email, phone };
  const newListContacts = [...contacts, newContact];

  await tryCatchHandler(
    fs.writeFile(contactsPath, JSON.stringify(newListContacts))
  );
  console.log(`${name} was added to contact list`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
