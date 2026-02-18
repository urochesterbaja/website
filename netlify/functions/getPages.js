const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async () => {
  try {
        await client.connect();
        const db = client.db("siteContent");
        const pages = await db.collection("pageStructure")
            .find({})
            .project({ pageSlug: 1 })
            .toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(pages)
        };

    }
  catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to fetch partnerPageContent"})
        };
    }
};
