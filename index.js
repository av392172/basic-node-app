const enableErrorHandler = require("./src/server/error-handeling");
const server = require("./src/server");

async function startServer() {
  try {
    console.log("Starting server. . .");
    enableErrorHandler();
    const port = await server();
    console.log("Server started on http://localhost:" + port);
  } catch (error) {
    console.log("Server failed to start!");
    process.exit(1);
  }
}
startServer();
