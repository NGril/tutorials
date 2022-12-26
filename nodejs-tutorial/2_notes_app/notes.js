const fs = require("fs");
const chalk = require("chalk"); // npm package for printing stuff to the console in color

const NOTES_FILENAME = "notes.json";

const addNote = (title, body) => {
  const notes = loadNotes();

  if (notes.find((note) => note.title === title)) {
    console.log(chalk.red(`Note with title '${title}' already exists!`));
    return;
  }

  notes.push({ title, body });
  saveNotes(notes);
  console.log(chalk.green(`Note with title '${title}' successfully added`));
};

const removeNote = (title) => {
  const notes = loadNotes();

  const newNotes = notes.filter((note) => note.title !== title);

  if (newNotes.length === notes.length) {
    console.log(chalk.red(`No note with title '${title}' found`));
    return;
  }

  saveNotes(newNotes);
  console.log(chalk.green(`Note with title '${title}' successfully removed`));
};

const listNotes = () => {
  console.log(chalk.blue("Your notes:"));
  loadNotes().forEach((note) => {
    console.log(chalk.green(note.title));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title);

  if (!noteToRead) {
    console.log(chalk.red(`Note with title '${title}' not found!`));
    return;
  }

  console.log(chalk.green(noteToRead.title));
  console.log(noteToRead.body);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(NOTES_FILENAME, dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(NOTES_FILENAME);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
