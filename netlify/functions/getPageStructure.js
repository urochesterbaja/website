const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async (event) => {
    try {
        await client.connect();
        const db = client.db("siteContent");
        const { pageSlug } = JSON.parse(event.body);

        const page = await db.collection("pageStructure")
            .findOne({ pageSlug });

        return {
        statusCode: 200,
        body: JSON.stringify({
            components: page.components || [],
            layoutConfig: page.layoutConfig || {
            allowedDynamicComponents: []
            }
        })
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