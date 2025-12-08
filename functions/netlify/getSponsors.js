import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
let cachedDB = null;

export const handler = async() => {
    try{
        if (!cachedDB) {
            await client.connect();
            cachedDB = client.db("sponsors");
        }

        const sponsors = await cachedDB.collection("users").find({}).toArray();

        return{
            statusCode: 200,
            body: JSON.stringify(sponsors)
        }
    }

    catch(err){
        return{
            statusCode: 500,
            body: JSON.stringify({error: err.message})
        }
    }
}

