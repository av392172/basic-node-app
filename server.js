require("dotenv").config(); //by default it uses .env file
// require("dotenv").config({ path: "./development.env" }); // this will use development.env file
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const morgan = require("morgan");
const helmet = require("helmet");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const PORT_NUMBER = process.env.PORT || 3000;
const app = express();
//   const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: storage });

// ------- Middlewares ---------
// enable body-parser
app.use(bodyParser.json()); //for json type body
app.use(bodyParser.urlencoded({ extended: true })); //for url encoded
// NOTE: form-data is used to send file(like pdf, img etc)
app.use(morgan("dev"));
app.use(helmet());

app.get("/", (req, res) => {
  //   return res.send("WELCOME TO EXPRESS WORLD. . .");          //send is generic function
  return res.json({ message: "WELCOME TO EXPRESS WORLD. . ." });
});
app.get("/test/:id", (req, res) => {
  // app.get("/test/:id?", (req, res) => {
  //by placing "?" after id we can make id as an optinal param
  //   return res.json({ id: req.params.id });
  return res.json({ id: req.params.id, queryParam: req.query });
});

app.post("/test", (req, res) => {
  return res.send({ data: req.body });
});
// upload some file
app.post("/upload", upload.single("file"), (req, res) => {
  return res.send({ data: req.body, file: req.file });
});

app.listen(PORT_NUMBER, (err) => {
  if (err) console.log("Failed to start server!!!" + err);
  console.log("Server started on http://localhost:" + PORT_NUMBER);
});
