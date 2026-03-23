export default async function handler(req, res) {
  // Aqui está o seu link real da Phantoms/SharkBot
  const TARGET_URL = "https://phantoms.group/l/cacaushow?shk=f4jzf8lf";

  try {
    const response = await fetch(TARGET_URL, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "phantoms.group", // Necessário para o servidor de destino aceitar
      },
      // Caso haja algum dado de formulário sendo enviado
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    const data = await response.text();

    res.setHeader('Content-Type', contentType);
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).send('Erro ao processar o checkout');
  }
}
