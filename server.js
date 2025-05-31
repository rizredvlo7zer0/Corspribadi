const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

const server = cors_proxy.createServer({
  originWhitelist: [], // Izinkan semua origin
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
  
  // Tambahkan handler untuk modifikasi request
  modifyRequest: (req) => {
    // Force Accept header untuk meminta JSON
    req.headers['accept'] = 'application/json';
    return req;
  },
  
  // Tambahkan handler untuk modifikasi response
  modifyResponse: (res) => {
    // Pastikan Content-Type adalah JSON
    res.headers['content-type'] = 'application/json';
    return res;
  }
});

server.listen(port, host, () => {
  console.log(`Server CORS proxy berjalan di http://${host}:${port}`);
});
