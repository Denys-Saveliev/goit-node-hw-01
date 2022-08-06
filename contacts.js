const fs = require("fs/promises");
const asyncHandler = require("./asyncHandler");
const { join } = require("path");
const uniqid = require("uniqid");

const contactsPath = join(__dirname, "db", "contacts.json");

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
  const findContactIdx = contacts.findIndex(({ id }) => id === contactId);

  if (findContactIdx === -1) {
    return console.log(`Contact with id: ${contactId} is absent!`);
  }
  const [removedContact] = contacts.splice(findContactIdx, 1);
  await asyncHandler(
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  );
  console.log(`Contact with id: ${contactId} was removed successfully!`);
  return removedContact;
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
