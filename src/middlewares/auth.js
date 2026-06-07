/**
 * Middleware de autenticação via sessão.
 * Verifica se o usuário está logado antes de permitir o acesso à rota.
 */
function autenticar(req, res, next) {
    if (req.session && req.session.usuarioLogado) {
        return next(); // usuário autenticado, prossegue
    }
    return res.status(401).json({ erro: 'Acesso negado. Faça login para continuar.' });
}

module.exports = { autenticar };
