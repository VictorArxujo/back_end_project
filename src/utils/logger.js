const fs = require('fs');
const path = require('path');

function registrarErro(erro) {
    const logMessage = `[${new Date().toISOString()}] ERRO: ${erro}\n`;
    fs.appendFileSync(path.join(__dirname, '../../error.log'), logMessage);
}

module.exports = { registrarErro };