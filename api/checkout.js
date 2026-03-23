export default async function handler(req, res) {
  const BASE_URL = "https://phantoms.group";
  const TARGET_URL = `${BASE_URL}/l/cacaushow?shk=f4jzf8lf`;

  try {
    const response = await fetch(TARGET_URL, {
      headers: {
        "User-Agent": req.headers["user-agent"],
        "Host": "phantoms.group"
      }
    });

    let html = await response.text();

    // MÁGICA: Este código procura links que começam com "/" e coloca o domínio da Phantoms na frente
    // Isso faz com que as imagens e o CSS voltem a carregar.
    html = html.replace(/(href|src|action)="\//g, `$1="${BASE_URL}/`);
    
    // Corrige também links que usam aspas simples
    html = html.replace(/(href|src|action)='\//g, `$1='${BASE_URL}/`);

    // Remove proteções que impedem o site de rodar em outro domínio (se houver)
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.status(200).send(html);

  } catch (error) {
    return res.status(500).send("Erro ao carregar o checkout. Verifique sua conexão.");
  }
}
