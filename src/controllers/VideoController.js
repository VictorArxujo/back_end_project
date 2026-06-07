const videoRepo = require('../repositories/VideoRepository');

class VideoController {

    async listar(req, res) {
        try {
            const videos = await videoRepo.findAll();
            return res.status(200).json(videos);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const video = await videoRepo.findById(id);
            if (!video) {
                return res.status(404).json({ erro: 'Vídeo não encontrado.' });
            }
            return res.status(200).json(video);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async upload(req, res) {
        const { titulo, descricao, url, duracao } = req.body;

        const erros = [];
        if (!titulo)  erros.push('O campo "titulo" é obrigatório.');
        if (!url)     erros.push('O campo "url" é obrigatório.');
        if (!duracao) erros.push('O campo "duracao" é obrigatório.');

        if (erros.length > 0) {
            return res.status(400).json({ erros });
        }

        try {
            const dadosDoVideo = {
                titulo,
                descricao: descricao || '',
                url,
                duracao,
                usuarioId: req.session.usuarioLogado.id,
                visualizacoes: 0,
                uploadEm: new Date()
            };

            await videoRepo.create(dadosDoVideo);
            return res.status(201).json({ mensagem: 'Vídeo cadastrado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        const { id } = req.params;
        try {
            const resultado = await videoRepo.delete(id);
            if (resultado.deletedCount === 0) {
                return res.status(404).json({ erro: 'Vídeo não encontrado.' });
            }
            return res.status(200).json({ mensagem: 'Vídeo deletado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = new VideoController();