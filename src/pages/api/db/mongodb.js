import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI; // Add this in .env.local
const MONGO_DB = process.env.MONGO_DB;  // Database name

if (!MONGO_URI || !MONGO_DB) {
  throw new Error("Please define the MONGO_URI and MONGO_DB environment variables in .env.local");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(MONGO_DB);
  return { client, db };
}