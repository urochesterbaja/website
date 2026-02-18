const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async function  (event, context) {
    try {
        await client.connect();
        const db = client.db("siteContent");

        const aboutPageContent = await db.collection("aboutPageContent")
            .findOne({ section: "aboutPage" })
        
        return {
            statusCode: 200,
            body: JSON.stringify(aboutPageContent)
        };
    }
    catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to fetch aboutPageContent"})
        };
    }
};