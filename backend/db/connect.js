import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI)
let cachedDB = null

export async function connectToDB() {
    if (cachedDB) return cachedDB;

    await client.connect();
    const db = client.db("bajasiteDB");
    cachedDB = db;
    return db;
}