module.exports = function (app) {
  const repo = require("../repo/user.repo");

  const BASE_URL = "/auth";

  app.post(BASE_URL + "/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await repo.login(email, password);
      return res.status(200).send({ message: "login successful!", data });
    } catch (error) {
      return res.status(400).send({ message: "Error " + error });
    }
  });

  app.post(BASE_URL + "/register", async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
      await repo.register(email, password, confirmPassword);
      return res.status(201).send({ message: "User successfully added!" });
    } catch (error) {
      return res.status(400).send({ message: "Error " + error });
    }
  });

  app.post(BASE_URL + "/token", async (req, res) => {
    try {
      const { token } = req.body;
      console.log("Token", token);
      const data = await repo.regenerateToken(token);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
};
