require('dotenv').config();
const { registrarErro } = require('../utils/logger'); 
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);
let db = null; 

async function connectDB() {
    try {
        if (db) return db; // Se tiver banco retorna o banco, se nao cria outro.

        console.log("Tentando conectar ao banco...");
        await client.connect();
        
        db = client.db(process.env.db_project); 
        console.log("Banco de dados conectado com sucesso!");
        
        return db;
    } catch (error) {
        registrarErro("Erro crítico ao conectar no banco de dados: " + error.message);
        throw error; 
    }
}

module.exports = { connectDB }; // Retornando a instancia do banco