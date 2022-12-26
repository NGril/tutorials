// this is a playground file for exploring MongoDB features

const { MongoClient, ObjectID } = require("mongodb");

// it's better to type the ip address instead of localhost because it avoids some strange issues that tend to happen sometimes
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-app-node-tutorial";

// --- Object ID ---
// manually generating an object id
// const id = new ObjectID();
// getting the timestamp when the id was created
// const timestamp = id.getTimestamp();
// binary data which is stored in the db to save space
// const binaryData = id.id;
// const stringData = id.toHexString();
// const sizeBinary = binaryData.length; // 12 bytes
// const sizeString = stringData.length; // 24 bytes

// connecting to database
// check mongo client docs for details regarding different options
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log("Unable to connect to database!");
    return;
  }

  // Mongo will automagically create a database if it doesn't exist, we don't need to do it manually
  // the same goes for collections
  // check api docs for a total list of commands
  const db = client.db(databaseName);

  // --- INSERT ONE ---
  //   db.collection("users").insertOne(
  //     {
  //       // we can manually generate the _id, as seen in this example, otherwise it will be auto-generated
  //       _id: id,
  //       name: "Luka",
  //       age: 22,
  //     },
  //     (error, result) => {
  //       if (error) {
  //         console.log("Unable to insert user!");
  //         return;
  //       }

  //       console.log(result.ops);
  //     }
  //   );

  // --- INSERT MANY ---
  //   db.collection("users").insertMany(
  //     [
  //       {
  //         name: "Ivo",
  //         age: 25,
  //       },
  //       {
  //         name: "Pero",
  //         age: 27,
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         console.log("Unable to insert users!");
  //         return;
  //       }

  //       console.log(result.ops);
  //     }
  //   );
  //   db.collection("tasks").insertMany(
  //     [
  //       {
  //         description: "Test task 1",
  //         completed: true,
  //       },
  //       {
  //         description: "Test task 2",
  //         completed: false,
  //       },
  //       {
  //         description: "Test task 3",
  //         completed: false,
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         console.log("Unable to insert tasks!");
  //         return;
  //       }

  //       console.log(result.ops);
  //     }
  //   );

  // --- FIND ONE ---
  // if we are searching by ObjectID we need to wrap it within the ObjectID function / constructor
  //   db.collection("users").findOne({ _id: ObjectID("624a914d90a92d6dfbd25ee6") }, (error, user) => {
  //     if (error) {
  //       console.log("Unable to find user!");
  //       return;
  //     }

  //     console.log(user);
  //   });

  // --- FIND ---
  // a bit different than find one since it doesn't take a callback as the second argument, it returns a cursor object (check mongo API reference)
  //   db.collection("users")
  //     .find({ name: "Niko" })
  //     .toArray((error, users) => {
  //       console.log(users);
  //     });

  //   db.collection("users")
  //     .find({ name: "Niko" })
  //     .count((error, count) => {
  //       console.log(count);
  //     });

  // -- UPDATE ONE --
  //   db.collection("users")
  //     .updateOne(
  //       { _id: ObjectID("624a92ab64d93b6fdee13531") },
  //       {
  //         $set: {
  //           name: "Pero",
  //           age: 50,
  //         },
  //       }
  //     )
  //     .then((result) => {
  //       console.log(result.modifiedCount);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  //   db.collection("users")
  //     .updateOne(
  //       { _id: ObjectID("624a92ab64d93b6fdee13531") },
  //       {
  //         $inc: { age: 5 },
  //       }
  //     )
  //     .then((result) => {
  //       console.log(result.modifiedCount);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // --- UPDATE MANY ---
  //   db.collection("tasks")
  //     .updateMany(
  //       { completed: false },
  //       {
  //         $set: { completed: true },
  //       }
  //     )
  //     .then((result) => {
  //       console.log(result.modifiedCount);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // --- DELETE ONE ---
  //   db.collection("tasks")
  //     .deleteOne({
  //       description: "Test task 3",
  //     })
  //     .then((result) => {
  //       console.log(result.deletedCount);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // --- DELETE MANY ---
  //   db.collection("users")
  //     .deleteMany({
  //       age: 27,
  //     })
  //     .then((result) => {
  //       console.log(result.deletedCount);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
});
