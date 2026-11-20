import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI! as string)
const db = client.db();

export {
    client,
    db
}
