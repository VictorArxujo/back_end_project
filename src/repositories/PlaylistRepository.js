const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const { registrarErro } = require('../utils/logger');

class PlaylistRepository {

    async create(playlistData) {
        try {
            playlistData.usuarioId = new ObjectId(playlistData.usuarioId);
            playlistData.criadaEm = new Date();

            const db = await connectDB();
            return await db.collection('playlists').insertOne(playlistData);
        } catch (error) {
            registrarErro("Erro ao criar playlist: " + error.message);
            throw error;
        }
    }

    async findAll() {
        try {
            const db = await connectDB();
            return await db.collection('playlists').find({}).toArray();
        } catch (error) {
            registrarErro("Erro ao buscar playlists: " + error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const db = await connectDB();
            return await db.collection('playlists').findOne({ _id: new ObjectId(id) });
        } catch (error) {
            registrarErro("Erro ao buscar playlist por ID: " + error.message);
            throw error;
        }
    }

    async findByUsuario(usuarioId) {
        try {
            const db = await connectDB();
            return await db.collection('playlists')
                .find({ usuarioId: new ObjectId(usuarioId) })
                .toArray();
        } catch (error) {
            registrarErro("Erro ao buscar playlists do usuário: " + error.message);
            throw error;
        }
    }

    async adicionarVideo(playlistId, videoId) {
        try {
            const db = await connectDB();
            return await db.collection('playlists').updateOne(
                { _id: new ObjectId(playlistId) },
                { $addToSet: { videos: new ObjectId(videoId) } }
            );
        } catch (error) {
            registrarErro("Erro ao adicionar vídeo na playlist: " + error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const db = await connectDB();
            return await db.collection('playlists').deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            registrarErro("Erro ao deletar playlist: " + error.message);
            throw error;
        }
    }
}

module.exports = new PlaylistRepository();
