import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri && process.env.NODE_ENV === "production") {
  console.warn("MONGODB_URI is not set — arcade scores will not persist.");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    return Promise.reject(new Error("MONGODB_URI is not configured"));
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  const dbName = process.env.MONGODB_DB_NAME ?? "portfolio";
  return client.db(dbName);
}

export function isMongoConfigured(): boolean {
  return Boolean(uri);
}
