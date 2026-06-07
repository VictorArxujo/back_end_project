const playlistRepo = require('../repositories/PlaylistRepository');

class PlaylistController {

    async listar(req, res) {
        try {
            const playlists = await playlistRepo.findAll();
            return res.status(200).json(playlists);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const playlist = await playlistRepo.findById(id);
            if (!playlist) {
                return res.status(404).json({ erro: 'Playlist não encontrada.' });
            }
            return res.status(200).json(playlist);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorUsuario(req, res) {
        const { usuarioId } = req.params;
        try {
            const playlists = await playlistRepo.findByUsuario(usuarioId);
            return res.status(200).json(playlists);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async criar(req, res) {
        const { nome, descricao } = req.body;

        if (!nome) {
            return res.status(400).json({ erros: ['O campo "nome" é obrigatório.'] });
        }

        try {
            const dadosDaPlaylist = {
                nome,
                descricao: descricao || '',
                usuarioId: req.session.usuarioLogado.id,
                videos: []
            };

            await playlistRepo.create(dadosDaPlaylist);
            return res.status(201).json({ mensagem: 'Playlist criada com sucesso!' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async adicionarVideo(req, res) {
        const { playlistId, videoId } = req.body;

        const erros = [];
        if (!playlistId) erros.push('O campo "playlistId" é obrigatório.');
        if (!videoId)    erros.push('O campo "videoId" é obrigatório.');

        if (erros.length > 0) {
            return res.status(400).json({ erros });
        }

        try {
            await playlistRepo.adicionarVideo(playlistId, videoId);
            return res.status(200).json({ mensagem: 'Vídeo adicionado à playlist com sucesso!' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        const { id } = req.params;
        try {
            const resultado = await playlistRepo.delete(id);
            if (resultado.deletedCount === 0) {
                return res.status(404).json({ erro: 'Playlist não encontrada.' });
            }
            return res.status(200).json({ mensagem: 'Playlist deletada com sucesso!' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = new PlaylistController();