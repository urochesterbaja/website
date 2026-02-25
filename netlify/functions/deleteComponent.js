const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // 🔐 Optional Auth0 validation
    // const token = event.headers.authorization?.split(" ")[1];
    // await verifyAuth0Token(token);

    const { pageSlug, componentId } = JSON.parse(event.body || "{}");

    if (!pageSlug || !componentId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing pageSlug or componentId" })
      };
    }

    const db = client.db("siteContent");

    const pageCollection = db.collection("pageStructure");

    // 1️⃣ Get page
    const page = await pageCollection.findOne({ pageSlug });


    if (!page) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Page not found" })
      };
    }

    // 2️⃣ Find component
    const component = page.components.find(c => c.id === componentId);

    if (!component) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Component not found" })
      };
    }

    // 3️⃣ Prevent deleting static components
    if (!component.isDynamic) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Cannot delete static component" })
      };
    }

    // 4️⃣ Delete referenced content document
    if (component.refId && component.collection) {
      try {
        await db.collection(component.collection).deleteOne({
          _id: new ObjectId(component.refId)
        });
      } catch (err) {
        console.warn("Failed deleting referenced doc:", err);
        // Continue anyway — structure cleanup still matters
      }
    }

    // 5️⃣ Remove component from pageStructure
    await pageCollection.updateOne(
      { pageSlug },
      { $pull: { components: { id: componentId } } }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        deletedComponentId: componentId
      })
    };
  } catch (err) {
    console.error("deleteComponent error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
}