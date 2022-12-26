import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect("MONGO_DB_CONNECTION_STRING");

  return client;
}
