import { MongoClient } from "mongodb";

// Ensure the MongoDB URI is set
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  appName: "nyumba-web3",
  useNewUrlParser: true,
};

let client: MongoClient;

// In development mode, use a global variable to persist the client
// across module reloads due to Hot Module Replacement (HMR)
if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri, options);
}

// Function to connect to the database
export async function connectToDatabase() {
  if (!client.on) {
    //await client.connect();
  }
  return client.db(process.env.DATABASE_NAME);
}

// Export the client instance for use in your functions
export default client;
