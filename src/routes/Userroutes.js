const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { autenticar } = require('../middlewares/auth');

router.get('/list', autenticar, (req, res) => userController.listar(req, res));
router.get('/find/:id', autenticar, (req, res) => userController.buscarPorId(req, res));
router.post('/create', (req, res) => userController.criar(req, res));
router.delete('/delete/:id', autenticar, (req, res) => userController.deletar(req, res));

module.exports = router;