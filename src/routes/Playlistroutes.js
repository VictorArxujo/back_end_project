const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/PlaylistController');
const { autenticar } = require('../middlewares/auth');

router.get('/list', (req, res) => playlistController.listar(req, res));
router.get('/find/:id', (req, res) => playlistController.buscarPorId(req, res));
router.get('/usuario/:usuarioId', autenticar, (req, res) => playlistController.buscarPorUsuario(req, res));
router.post('/create', autenticar, (req, res) => playlistController.criar(req, res));
router.post('/addvideo', autenticar, (req, res) => playlistController.adicionarVideo(req, res));
router.delete('/delete/:id', autenticar, (req, res) => playlistController.deletar(req, res));

module.exports = router;