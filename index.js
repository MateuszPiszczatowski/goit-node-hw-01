import contactsHandler from "./contacts.mjs";
import tests from "./tests.mjs";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const handleList = async () => {
  try {
    await contactsHandler.listContacts();
  } catch (error) {
    console.log("Couldn't list contacts: ", error.message);
  }
};

const handleGet = async (id) => {
  if (id) {
    try {
      console.table(await contactsHandler.getContactById(id));
    } catch (error) {
      console.log("Couldn't get contacts: ", error.message);
    }
  } else {
    console.log("You need to provide an id to use that option");
  }
};

const handleAdd = async (name, email, phone) => {
  if (name && email && phone) {
    try {
      const addedContact = await contactsHandler.addContact(name, email, phone);
      console.log("Added contact:");
      console.table(addedContact);
    } catch (error) {
      console.log("Couldn't add contacts: ", error.message);
    }
  } else {
    console.log("Name, email and phone number need to be provided to use that option");
  }
};

const handleRemove = async (id) => {
  if (id) {
    try {
      if (await contactsHandler.removeContact(id)) {
        console.log(`Successfully deleted contact with id "${id}"`);
      } else {
        console.log(`Could not find any contact with id "${id}" `);
      }
    } catch (error) {
      console.log("Couldn't remove contacts: ", error.message);
    }
  } else {
    console.log("You need to provide an id to use that option");
  }
};

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await handleList();
      break;
    case "get":
      await handleGet(id);
      break;
    case "add":
      await handleAdd(name, email, phone);
      break;
    case "remove":
      await handleRemove(id);
      break;
    case "test":
      await tests();
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
