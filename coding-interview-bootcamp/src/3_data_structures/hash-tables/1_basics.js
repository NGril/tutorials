let user = {
  age: 54,
  name: "Kylie",
  magic: true,
  scream: function () {
    console.log("ahhhhhh!");
  },
};

user.age; // access - O(1)
user.spell = "abra kadabra"; // insert - O(1)
user.scream(); // O(1)
