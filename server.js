const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

// Konfigurasi khusus untuk Blogger/Feed
const server = cors_proxy.createServer({
  originWhitelist: [], // Izinkan semua origin
  requireHeader: [], // Tidak membutuhkan header khusus
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-heroku-queue-wait-time',
    'x-heroku-queue-depth',
    'x-request-start'
  ],
  setHeaders: {
    'Referer': 'https://www.blogger.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
    secure: false
  }
});

server.listen(port, host, () => {
  console.log(`Server proxy aktif di http://${host}:${port}`);
});
