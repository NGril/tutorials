const fs = require("fs");

// read data from file
const buffer = fs.readFileSync("1_data.json");
const dataJSON = buffer.toString();
const parsedData = JSON.parse(dataJSON);

// override properties
parsedData.name = "Niko";
parsedData.age = 26;

// stringify new object
const newDataJSON = JSON.stringify(parsedData);

// override file contents
fs.writeFileSync("./1_data.json", newDataJSON);
