const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();
const BoardController = require("./controllers/BoardController");
const FileController = require("./controllers/FileController");

routes.post("/boards", BoardController.store);
routes.get("/boards/:id", BoardController.show);
routes.post("/boards/:id/files", multer(multerConfig).single("file"), //.array() Para enviar multiplos arquivos
  FileController.store
);

module.exports = routes;
