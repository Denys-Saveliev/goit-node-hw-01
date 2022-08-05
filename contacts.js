const fs = require("fs/promises");
const asyncHandler = require("./asyncHandler");
const { resolve } = require("path");
const uniqid = require("uniqid");

const contactsPath = resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await asyncHandler(fs.readFile(contactsPath));
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await asyncHandler(listContacts());
  const contact = contacts.find(({ id }) => id === contactId);
  return !contact
    ? console.log(`Contact with id: ${contactId} is absent!`)
    : contact;
}

async function removeContact(contactId) {
  const contacts = await asyncHandler(listContacts());
  const newContacts = contacts.filter(({ id }) => id !== contactId);

  await asyncHandler(fs.writeFile(contactsPath, JSON.stringify(newContacts)));
  console.log(`Contact with id: ${contactId} was removed from contact list`);
}

async function addContact(name, email, phone) {
  const contacts = await asyncHandler(listContacts());
  const newContact = { id: uniqid(), name, email, phone };
  const newListContacts = [...contacts, newContact];

  await asyncHandler(
    fs.writeFile(contactsPath, JSON.stringify(newListContacts, null, 2))
  );
  console.log(`${name} was added to contact list`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
