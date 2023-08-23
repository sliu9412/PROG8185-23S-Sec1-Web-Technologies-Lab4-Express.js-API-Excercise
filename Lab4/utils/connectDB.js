const { MongoClient } = require("mongodb");

async function connectDB(url, dbName) {
  try {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    console.log("Connect Database Failed");
    return false;
  }
}

module.exports = connectDB;
