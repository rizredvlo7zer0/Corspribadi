export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(url).host,
        origin: req.headers.origin || '*'
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined
    });

    const data = await response.arrayBuffer();
    const headers = {};
    response.headers.forEach((value, key) => headers[key] = value);

    res.writeHead(response.status, headers);
    res.end(Buffer.from(data));
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}