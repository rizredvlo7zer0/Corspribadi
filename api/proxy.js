import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const method = req.method.toLowerCase();
    const axiosConfig = {
      method,
      url,
      headers: { ...req.headers, host: undefined }, // hapus host agar tidak konflik
      data: req.body,
      responseType: 'arraybuffer',
    };

    const response = await axios(axiosConfig);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      return res.status(200).end(); // CORS preflight
    }

    res.setHeader('Content-Type', response.headers['content-type']);
    res.status(response.status).send(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Request failed', detail: err.message });
  }
}
