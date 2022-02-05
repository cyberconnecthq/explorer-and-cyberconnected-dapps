require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const docs = require("./routes/docs");
const user = require("./routes/user");
const follower = require("./routes/follower");
const tweet = require("./routes/tweet");
const feed = require("./routes/feed");
const explore = require("./routes/explore");
const bookmarks = require("./routes/bookmarks");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

//app.use("/api/", docs);
app.use("/api/user", user);
app.use("/api/follow", follower);
app.use("/api/tweet", tweet);
app.use("/api/feed", feed);
app.use("/api/explore", explore);
app.use("/api/bookmarks", bookmarks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
