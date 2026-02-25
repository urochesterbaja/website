const { MongoClient, ObjectId } = require("mongodb");

exports.handler = async (event) => {
  const { collection, refId, data } = JSON.parse(event.body);
  const { _id, ...updateData } = data;

  console.log("--- DEBUG START ---");
  console.log("Collection Name:", collection);
  console.log("RefId Type:", typeof refId);
  console.log("RefId Value:", JSON.stringify(refId));
  console.log("--- DEBUG END ---");

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const result = await client.db("siteContent").collection(collection).updateOne(
  { _id: new ObjectId(refId) },
  { $set: updateData } 
);

  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true,
        matched: result.matchedCount,
        modified: result.modifiedCount,
    })
  };
};
