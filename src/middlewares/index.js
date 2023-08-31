module.exports = function (app) {
  const helmet = require("helmet"); //for security (to hide details like stack. . .)
  const morgan = require("morgan"); //for api req details on command line
  const bodyParser = require("body-parser"); //for json, urlencoded etc data transfer
  const swaggerUi = require("swagger-ui-express"); //for documentation
  const cors = require("cors");
  const swaggerSpecs = require("../server/swagger"); //for documentation
  const rateLimit = require("express-rate-limit");
  const authMiddleware = require("./auth-middleware");

  const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per `window` (here, per 5 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  app.use(authMiddleware);
  app.use(limiter);
};
