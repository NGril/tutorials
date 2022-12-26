// object literal - property names may or may not be wrapped in quotes
var objectLiteral = {
  firstname: "Mary",
  isAProgrammer: true,
};

console.log(objectLiteral);

// JSON - also valid object literal syntax - in JSON property names have to be wrapped in quotes
// JSON is technically a subset of the object literal syntax
// {
//     "firstname": "Jane",
//     "isAProgrammer": true
// }
var jsonObject = '{ "firstname": "Niko" }';

// javascript has built in features to convert between objects and JSON
JSON.parse(jsonObject);
JSON.stringify(objectLiteral);
