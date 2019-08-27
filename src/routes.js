const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const router = express.Router();
const BoardController = require("./controllers/BoardController");
const UserController = require("./controllers/UserController");
const FileController = require("./controllers/FileController");
const authMiddleware = require("./middlewares/auth");

router.get("/me", UserController.me);
router.post("/register", UserController.register);
router.post("/authenticate", UserController.authenticate);
// router.use(authMiddleware);

router.post("/board", BoardController.store);
router.get("/boards", BoardController.getAll);
router.get("/boards/:id", BoardController.show);
router.post("/boards/:id/files", multer(multerConfig).single("file"), //.array() Para enviar multiplos arquivos
  FileController.store
);

module.exports = router;
