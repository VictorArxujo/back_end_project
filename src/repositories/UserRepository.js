const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const { registrarErro } = require('../utils/logger');

class UserRepository {

    async create(userData) {
        try {
            const db = await connectDB();
            userData.criadoEm = new Date();
            return await db.collection('users').insertOne(userData);
        } catch (error) {
            registrarErro('Erro ao criar usuário: ' + error.message);
            throw error;
        }
    }

    async findAll() {
        try {
            const db = await connectDB();
            return await db.collection('users').find({}).toArray();
        } catch (error) {
            registrarErro('Erro ao buscar usuários: ' + error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const db = await connectDB();
            return await db.collection('users').findOne({ _id: new ObjectId(id) });
        } catch (error) {
            registrarErro('Erro ao buscar usuário por ID: ' + error.message);
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const db = await connectDB();
            return await db.collection('users').findOne({ email });
        } catch (error) {
            registrarErro('Erro ao buscar usuário por e-mail: ' + error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const db = await connectDB();
            return await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            registrarErro('Erro ao deletar usuário: ' + error.message);
            throw error;
        }
    }
}

module.exports = new UserRepository();
