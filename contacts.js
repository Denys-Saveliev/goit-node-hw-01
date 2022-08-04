const fs = require("fs/promises");
const { resolve } = require("path");
const uniqid = require("uniqid");

const contactsPath = resolve("./db/contacts.json");

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return !contact
    ? console.log(`Contact with id: ${contactId} is absent!`)
    : contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter(({ id }) => id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with id: ${contactId} was removed from contact list`);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: uniqid(), name, email, phone };
  const newListContacts = [...contacts, newContact];

  try {
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
    console.log(`${name} was added to contact list`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
