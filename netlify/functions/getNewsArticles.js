const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async function  (event, context) {
    try {
        await client.connect();
        const db = client.db("siteContent");

        const newsArticles = await db.collection("newsArticles")
            .find({})
            .sort({year: -1})
            .toArray();
        
        return {
            statusCode: 200,
            body: JSON.stringify(newsArticles)
        };
    }
    catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to fetch results"})
        };
    }
};
