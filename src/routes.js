const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const router = express.Router();
const SymbolController = require('./controllers/SymbolController');
const BoardController = require('./controllers/BoardController');
const PlanController = require('./controllers/PlanController');
const UserController = require('./controllers/UserController');
const FileController = require('./controllers/FileController');
const ModuleController = require('./controllers/ModuleController');
const authMiddleware = require('./middlewares/auth');

router.get('/me/:id', UserController.me);
router.post('/register', UserController.register);
router.post('/authenticate', UserController.authenticate);
router.post('/linkUser', UserController.linkUser);
router.use(authMiddleware);

router.post('/board', BoardController.store);
router.put('/board/:id', BoardController.update);
router.get('/boards', BoardController.getAll);
router.get('/boards/:id', BoardController.show);
router.get('/boards/:planId/plan', BoardController.showByPlan);

router.post(
  '/saveFile/:boardId',
  multer(multerConfig).single('file'), //.array() Para enviar multiplos arquivos
  FileController.store
);
router.post(
  '/saveSymbol/:symbolId',
  multer(multerConfig).single('file'),
  FileController.storeSymbol
);
router.get('/file/:id', FileController.show);
router.post('/files', FileController.showMultipleIds);

router.post('/plan', PlanController.store);
router.get('/plans', PlanController.getAll);
router.get('/plan/:owner', PlanController.showByPlanByOwner);

router.post('/module', ModuleController.store);
router.get('/modules', ModuleController.getAll);
router.put('/module/:id', ModuleController.update);

router.post('/symbol', SymbolController.store);
router.put('/symbol/:id', SymbolController.update);
router.get('/symbols', SymbolController.getAll);
router.get('/symbols/:id', SymbolController.show);

module.exports = router;
