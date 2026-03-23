export default async function handler(req, res) {
  // ⚠️ ATENÇÃO: Troque a URL abaixo pela URL que o SharkBot te deu
  const SHARKBOT_URL = 'https://SUA_LOJA.sharkbot.com'; 
  
  const path = req.url.replace('/comprar', '').replace('/api/checkout', '');
  const targetUrl = `${SHARKBOT_URL}${path}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(SHARKBOT_URL).host,
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    const data = await response.text();

    res.setHeader('Content-Type', contentType);
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).send('Erro ao carregar checkout');
  }
}
