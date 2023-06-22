import { MongoClient, ObjectId} from 'mongodb';
import MongoDotNotation from 'mongo-dot-notation';

const DB_NAME = process.env.DATABASE_NAME;
const DB_URL = process.env.DATABASE_URL;

export const client = new MongoClient(DB_URL);

const doDatabaseOperation = async (operation) => {
    let result = null;

    try {
        await client.connect();
        result = await(operation(client.db(DB_NAME)));
    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }

    return result;
}


const addUser = async(collectionName, data) => {
    return doDatabaseOperation( async(db) => {
        return db.collection(collectionName).insertOne(data);
    })
}

module.exports = addUser;