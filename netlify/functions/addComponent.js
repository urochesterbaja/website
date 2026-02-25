const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);

exports.handler = async (event) => {
  const { pageSlug, type } = JSON.parse(event.body);

  await client.connect();
  const db = client.db("siteContent");

  const page = await db.collection("pageStructure").findOne({ pageSlug });

  const allowed = page.layoutConfig.allowedDynamicComponents.find(
    c => c.type === type
  );

  if (!allowed) {
    return { statusCode: 400, body: "Not allowed" };
  }

  const componentRegistry = await db.collection("componentRegistry").findOne({});
  const registryEntry = componentRegistry[type];

  const newDoc = await db
    .collection(allowed.collection)
    .insertOne(registryEntry.defaultData);

    const newDocId = newDoc.insertedId.toString();

  const newComponent = {
    id: `${type}-${Date.now()}`,
    type,
    collection: allowed.collection,
    refId: newDocId,
    isDynamic: true
  };

  const result = await db.collection("pageStructure").updateOne(
    { pageSlug },
    { $push: { components: newComponent } }
  );

  
  return {
    statusCode: 200,
    body: JSON.stringify(newComponent)
  };
}