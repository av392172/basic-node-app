module.exports = function () {
  if (process.env.NODE_ENV === "production") {
    process.on("unhandledRejection", (reason, promise) => {
      console.error(promise, reason);
      process.exit(1);
    });
    process.on("uncaughtException", (error) => {
      console.error(error);
      process.exit(1);
    });
  }
};
