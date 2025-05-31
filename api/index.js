export default async function handler(req, res) {
  const targetUrl = req.url.replace(/^\//, '').replace(/^https?:\/\//, 'https://');

  try {
    const proxyRes = await fetch(`https://${targetUrl}`, {
      method: req.method,
      headers: {
        ...req.headers,
        host: targetUrl.split('/')[0]
      },
      body: ['GET', 'HEAD'].includes(req.method) ? null : req.body
    });

    const contentType = proxyRes.headers.get("content-type");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Content-Type", contentType || "text/plain");

    const buffer = await proxyRes.arrayBuffer();
    res.status(proxyRes.status).send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}