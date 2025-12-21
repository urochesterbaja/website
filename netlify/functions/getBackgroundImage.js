import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI

export async function handler(event, context) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    //HERRE FIC THIS HERE
    const db = client.db("yourDatabaseName"); 
    const collection = db.collection("backgroundImages");

    const imageDoc = await collection.findOne({}, { sort: { createdAt: -1 } });

    if (!imageDoc) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No image found" }),
      };
    }

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: imageDoc.url }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
}