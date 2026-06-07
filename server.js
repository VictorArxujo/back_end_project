require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { connectDB } = require('./src/config/db');

// Rotas
const userRoutes = require('./src/routes/Userroutes');
const videoRoutes = require('./src/routes/Videoroutes');
const playlistRoutes = require('./src/routes/Playlistroutes');
const authRoutes = require('./src/routes/Authroutes');

const app = express();

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessão
app.use(session({
    secret: process.env.SESSION_SECRET || 'segredo_padrao',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,       // true em produção com HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/videos', videoRoutes);
app.use('/playlists', playlistRoutes);

// Rota raiz
app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Streaming de Vídeos - Projeto 2' });
});

// Rota não encontrada
app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

// Handler global de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: 'Erro interno do servidor' });
});

// Iniciar servidor
async function iniciarApp() {
    try {
        console.log('--- CONECTANDO AO BANCO DE DADOS ---');
        await connectDB();
        console.log('Banco de dados conectado!');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}!`);
        });
    } catch (error) {
        console.error('Falha ao iniciar o sistema:', error);
        process.exit(1);
    }
}

iniciarApp();
