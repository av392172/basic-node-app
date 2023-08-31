const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //   console.log("Inside auth middleware");
  if (req.url.includes("/auth")) {
    return next();
  } else {
    try {
      // Authorization: Bearer token
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // locals: persist data between request and response cycle
      res.locals.user = decoded.sub;
      return next();
    } catch (err) {
      // err
      return res.status(401).send({ Error: "invalid token!" });
    }
  }
};
