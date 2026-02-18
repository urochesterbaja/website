const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async function  (event, context) {
    try {
        await client.connect();
        const db = client.db("siteContent");

        const teamMembers = await db.collection("teamMembers")
            .find()
            .toArray();
        
        return {
            statusCode: 200,
            body: JSON.stringify(teamMembers)
        };
    }
    catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Failed to fetch teamMembers"})
        };
    }
};