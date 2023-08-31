module.exports = function (app) {
  const repo = require("../repo/product.repo");
  const BASE_URL = "/product";

  app.get(BASE_URL + "/:id?", async (req, res) => {
    try {
      let data;
      if (req.params.id) {
        data = await repo.getById(req.params.id);
      } else {
        data = await repo.getAll();
      }
      if (!data) {
        return res.status(204).send();
      }
      return res.send({ data, user: res.locals.user });
    } catch (error) {
      return res.status(400).send(e);
    }
  });

  app.post(BASE_URL, async (req, res) => {
    try {
      await repo.add(req.body);
      return res.status(201).send({ message: "Employee added successfully!" });
    } catch (error) {
      return res.status(400).send(error);
    }
  });

  app.put(BASE_URL + "/:id", async (req, res) => {
    try {
      await repo.update(req.params.id, req.body);
      return res.send({ message: success });
    } catch (error) {
      return res.status(400).send({ error: "failed to update" });
    }
  });

  app.delete(BASE_URL + "/:id", async (req, res) => {
    try {
      await repo.delete(req.params.id);
      return res.send({ message: success });
    } catch (error) {
      return res.status(400).send({ error: "failed to delete" });
    }
  });
};
