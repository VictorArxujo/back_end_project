const userRepo = require('../repositories/UserRepository');

class AuthController {

    async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Os campos "email" e "senha" são obrigatórios.' });
        }

        try {
            const usuario = await userRepo.findByEmail(email);

            if (!usuario || usuario.senha !== senha) {
                return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
            }

            req.session.usuarioLogado = {
                id: usuario._id.toString(),
                nome: usuario.nome,
                email: usuario.email
            };

            return res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                usuario: {
                    id: usuario._id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    logout(req, res) {
        if (!req.session.usuarioLogado) {
            return res.status(400).json({ erro: 'Nenhum usuário está logado.' });
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao encerrar sessão.' });
            }
            res.clearCookie('connect.sid');
            return res.status(200).json({ mensagem: 'Logout realizado com sucesso!' });
        });
    }

    me(req, res) {
        if (!req.session.usuarioLogado) {
            return res.status(401).json({ erro: 'Nenhum usuário logado.' });
        }
        return res.status(200).json({ usuario: req.session.usuarioLogado });
    }
}

module.exports = new AuthController();