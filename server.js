const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'text/javascript',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.jfif': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.webp': 'image/webp',
    '.mp3':  'audio/mpeg',
    '.mp4':  'video/mp4',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
    let requestUrl = decodeURI(req.url);
    let filePath = '.' + requestUrl.split('?')[0]; 
    
    if (filePath === './') {
        filePath = './index.html';
    }

    // Sempre buscar os arquivos na pasta niver-built/
    filePath = './niver-built/' + filePath.replace('./', '');

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Arquivo não encontrado</h1><p>O arquivo ' + filePath + ' não existe.</p>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('500 - Erro interno do servidor: ' + err.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🔗 Acesse o site em: http://localhost:${PORT}/`);
    console.log(`========================================`);
});
