const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectRoom", item => {
    socket.join(item);
  });
});

mongoose.connect(
  "mongodb://tagarela1:tagarela1@ds163757.mlab.com:63757/heroku_4c717002",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
app.use(routes);

server.listen(process.env.PORT);
