import { DataAPIClient } from "@datastax/astra-db-ts";

// Initialize the client
async function  connectDB() {
        try {
            const client = new DataAPIClient(process.env.ASTRADB_TOKEN);
            const db = client.db(process.env.ASTRADB_URL);
            const colls = await db.listCollections();
            console.log('Connected to AstraDB:', colls);
            
        } catch (error) {
            console.log('Error connecting to AstraDB:', error)
        }
    }
export default connectDB;