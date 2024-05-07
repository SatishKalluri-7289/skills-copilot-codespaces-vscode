// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = `.${parsedUrl.pathname}`;
  if (pathname === './') {
    pathname = './index.html';
  }

  const ext = path.parse(pathname).ext;
  const contentTypes = {
    '.html': 'text/html',
    '.htm': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
  };

  fs.readFile(pathname, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
    } else {
      res.setHeader('Content-Type', contentTypes[ext] || 'text/plain');
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});