const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const PORT = process.env.PORT || 8081;

app.prepare().then(() => {
  const server = express();

  server.listen(PORT, err => {
    if (err) throw err;
    console.log('> Ready on port ' + PORT);
  });
});
