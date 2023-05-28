import contactsHandler from "./contacts.mjs";

export default async () => {
  console.log("Running tests:");
  console.log();

  console.log("1. Test listing contacts");
  await contactsHandler.listContacts();

  console.log("2. Test getting existing contact. Should return existing contact.");
  console.log(await contactsHandler.getContactById("AeHIrLTr6JkxGE6SN-0Rw"));

  console.log("3. Test getting non-existing contact. Should return undefined.");
  console.log(await contactsHandler.getContactById("manna"));

  console.log(
    "4. Test adding contact. Should return object: \n{\n'id': some_randome_generated_id,\n'name': 'Tester',\n'email': 'test@test.te',\n'phone': '(123) 456-7890'\n}\nResult:"
  );
  const addedContact = await contactsHandler.addContact("Tester", "test@test.te", "(123) 456-7890");
  console.log(addedContact);

  console.log("5. Test removing existing contact. Should return true");
  console.log(await contactsHandler.removeContact(addedContact.id));

  console.log("6. Test removing non-existing contact. Should return false");
  console.log(await contactsHandler.removeContact("Non existant id"));
};
