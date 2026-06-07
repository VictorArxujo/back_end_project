const { connectDB } = require('../config/db');  // importando o modulo de bd
const { ObjectId } = require('mongodb');
const { registrarErro } = require('../utils/logger');

class VideoRepository {

    async create(videoData) {
        try {
            const db = await connectDB();
            const result = await db.collection('videos').insertOne(videoData);
            return result;
        } catch (error) {
            registrarErro("Erro ao criar vídeo: " + error.message);
            throw error;
        }
    }

    // Método para buscar todos os vídeos
    async findAll() {
        try {
            const db = await connectDB();
            return await db.collection('videos').find({}).toArray();
        } catch (error) {
            registrarErro("Erro ao buscar vídeos: " + error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const db = await connectDB();
            return await db.collection('videos').findOne({ _id: new ObjectId(id) });
        } catch (error) {
            registrarErro("Erro ao buscar vídeo por ID: " + error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const db = await connectDB();
            return await db.collection('videos').deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            registrarErro("Erro ao deletar vídeo: " + error.message);
            throw error;
        }
    }
}

module.exports = new VideoRepository(); // exporta a instancia da classe