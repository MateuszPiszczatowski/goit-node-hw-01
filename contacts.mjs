import filesHandler from "fs/promises";
import pathHandler from "path";
import { nanoid } from "nanoid";

const contactsPath = pathHandler.join("db", "contacts.json");
const headings = ["id", "name", "email", "phone"];

async function readContacts() {
  return JSON.parse((await filesHandler.readFile(contactsPath)).toString());
}

async function saveContacts(content) {
  await filesHandler.writeFile(contactsPath, content);
}

async function listContacts() {
  console.table(await readContacts());
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  return contacts.find((contact) => {
    return contact.id === contactId;
  });
}

async function removeContact(contactId) {
  const contactToDelete = await getContactById(contactId);
  if (contactToDelete) {
    const contacts = (await readContacts()).filter((contact) => contact.id !== contactId);
    saveContacts(JSON.stringify(contacts));
    return true;
  }
  return false;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  let id;
  do {
    id = nanoid();
  } while (contacts.find((contact) => contact.id === id));
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  saveContacts(JSON.stringify(contacts));
  return newContact;
}

export default { listContacts, getContactById, removeContact, addContact, readContacts };
