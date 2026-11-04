import { MongoClient, Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!globalForMongo.mongoClientPromise) {
    const client = new MongoClient(uri);

    globalForMongo.mongoClientPromise = client.connect();
  }

  const client = await globalForMongo.mongoClientPromise;

  return client.db(process.env.MONGODB_DB || "icare");
}
