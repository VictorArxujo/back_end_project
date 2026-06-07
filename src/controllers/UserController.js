const userRepo = require('../repositories/UserRepository');
global.crypto = require('crypto')

class UserController {

    async listar(req, res) {
        try {
            const users = await userRepo.findAll();
             const usersSemSenha = users.map(({ senha, ...u }) => u);
            return res.status(200).json(usersSemSenha);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const user = await userRepo.findById(id);
            if (!user) {
                return res.status(404).json({ erro: 'Usuário não encontrado.' });
            }
            const { senha, ...userSemSenha } = user;
            return res.status(200).json(userSemSenha);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async criar(req, res) {
        const { nome, email, senha } = req.body;

        const erros = [];
        if (!nome)  erros.push('O campo "nome" é obrigatório.');
        if (!email) erros.push('O campo "email" é obrigatório.');
        if (!senha) erros.push('O campo "senha" é obrigatório.');

        if (erros.length > 0) {
            return res.status(400).json({ erros });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ erros: ['Formato de e-mail inválido.'] });
        }

        try {
            const existente = await userRepo.findByEmail(email);
            if (existente) {
                return res.status(409).json({ erro: 'Já existe um usuário com este e-mail.' });
            }

            await userRepo.create({ nome, email, senha });
            return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        const { id } = req.params;
        try {
            const resultado = await userRepo.delete(id);
            if (resultado.deletedCount === 0) {
                return res.status(404).json({ erro: 'Usuário não encontrado.' });
            }
            return res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = new UserController();