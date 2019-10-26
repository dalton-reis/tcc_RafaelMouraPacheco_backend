const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const router = express.Router();
const BoardController = require("./controllers/BoardController");
const PlanController = require("./controllers/PlanController");
const UserController = require("./controllers/UserController");
const FileController = require("./controllers/FileController");
const ModuleController = require("./controllers/ModuleController");
const authMiddleware = require("./middlewares/auth");

router.get("/me/:id", UserController.me);
router.post("/register", UserController.register);
router.post("/authenticate", UserController.authenticate);
router.use(authMiddleware);

router.post("/board", BoardController.store);
router.post("/board/:id", BoardController.update);
router.get("/boards", BoardController.getAll);
router.get("/boards/:id", BoardController.show);
router.get("/boards/:planId/plan", BoardController.showByPlan);
router.post("/boards/:id/files", multer(multerConfig).single("file"), //.array() Para enviar multiplos arquivos
  FileController.store
);

router.post("/plan", PlanController.store);
router.get("/plans", PlanController.getAll);

router.post("/module", ModuleController.store);
router.get("/modules", ModuleController.getAll);
router.put("/module/:id", ModuleController.update);

module.exports = router;
