module.exports = function (app) {
  const homeRoutes = require("./home.routes");
  const empRoutes = require("./employee.routes");
  const userRoutes = require("./user.routes");

  homeRoutes(app);
  empRoutes(app);
  userRoutes(app);
};
