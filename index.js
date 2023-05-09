const { Command } = require("commander");
const program = new Command();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.log(allContacts);
    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById);
    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const contactToDelete = await removeContact(id);
      return console.log(contactToDelete);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();
invokeAction(argv);
