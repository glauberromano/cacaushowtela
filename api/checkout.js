export default async function handler(req, res) {
  // O link real fica escondido aqui dentro do servidor
  const URL_REAL = "https://phantoms.group/l/cacaushow?shk=f4jzf8lf";

  try {
    // Pega as UTMs (rastreamento) se existirem na URL atual
    const url = new URL(req.url, `https://${req.headers.host}`);
    const searchParams = url.search;
    
    // Monta a URL final para o robô buscar, juntando o link real + UTMs
    const targetUrl = URL_REAL + (searchParams ? "&" + searchParams.slice(1) : "");

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "phantoms.group", // Importante para o destino aceitar
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    const data = await response.text();

    res.setHeader('Content-Type', contentType);
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).send('Erro ao processar o checkout. Verifique o link no arquivo api/checkout.js');
  }
}
