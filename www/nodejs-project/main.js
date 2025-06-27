const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Richiesta ricevuta:', req.url);

  const responseData = {
    message: "Server OK",
    timestamp: new Date().toISOString()
  };

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',  // obbligatorio per evitare blocchi CORS
  });
  res.end(JSON.stringify(responseData));
});

server.listen(3000, () => {
  console.log('Server Node.js avviato sulla porta 3000');
});
