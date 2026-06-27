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
    const urlPath = req.url.split('?')[0];
    
    let filePath;
    if (urlPath === '/niver' || urlPath === '/niver/') {
        filePath = path.join(__dirname, 'niver-built', 'index.html');
    } else if (urlPath.startsWith('/niver/')) {
        const relativePath = urlPath.slice(7); // Remove '/niver/'
        filePath = path.join(__dirname, 'niver-built', relativePath);
    } else {
        filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Arquivo não encontrado');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});
