const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const uri = process.env.DB_HOST;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// console.log("uri", uri);
function connect() {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
}

function close() {
  return mongoose.connection.close();
}

module.exports = { client, connect, close };
