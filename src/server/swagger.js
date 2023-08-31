module.exports = function () {
  const swaggerJsDoc = require("swagger-jsdoc");

  const options = {
    definition: {
      openapi: "3.0.0",
    },
    info: {
      title: "App api",
      version: "0.1.0",
      description: "Sample crud implementation API",
    },
    servers: [{ url: "http://localhost:3000" }],
    apis: ["../routes/*.js"],
  };
  return swaggerJsDoc(options);
};
