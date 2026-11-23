
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("Please add MONGO_URI to .env.local");
}

const options = {};

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }

    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

const clientInstance = await clientPromise;

const db: Db = clientInstance.db("osint-db");

export { clientInstance as client, db };
export default db;
