module.exports = function () {
  return new Promise(function (resolve, reject) {
    const config = require("../config");
    const express = require("express");
    const enableMiddlewares = require("../middlewares");
    const enableRoutes = require("../routes");

    const app = express();

    // middlewares
    enableMiddlewares(app); //enabeling all the middlewares

    // routes
    enableRoutes(app); //routes here
    app.listen(config.PORT_NUMBER, (err) => {
      if (err) {
        reject();
      } else {
        resolve(config.PORT_NUMBER);
      }
    });
  });
};
