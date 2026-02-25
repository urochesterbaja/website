const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);

exports.handler = async (event) => {
  const { collection, refId } = JSON.parse(event.body);

  await client.connect();

  const doc = await client
    .db("siteContent")
    .collection(collection);

  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify(doc)
  };
};
