module.exports = function (app) {
  const { client } = require("../config/db");
  const BASE_PATH = "/";

  app.get(BASE_PATH, (req, res) => {
    return res.send("Welcome to API app!");
  });

  //   POST: /testdb
  app.post(BASE_PATH + "testdb", async (req, res) => {
    try {
      const database = client.db("EmployeeDB");
      const haiku = database.collection("demo");
      const result = await haiku.insertOne(req.body);
      return res.send(
        `A document was inserted with the _id: ${result.insertedId}`
      );
    } finally {
      await client.close();
    }
  });
};
