const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController');
const { autenticar } = require('../middlewares/auth');

router.get('/list', (req, res) => videoController.listar(req, res));
router.get('/find/:id', (req, res) => videoController.buscarPorId(req, res));
router.post('/upload', autenticar, (req, res) => videoController.upload(req, res));
router.delete('/delete/:id', autenticar, (req, res) => videoController.deletar(req, res));

module.exports = router;