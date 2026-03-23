export default async function handler(req, res) {
  const BASE_URL = "https://phantoms.group";
  const TARGET_URL = `${BASE_URL}/l/cacaushow?shk=f4jzf8lf`;

  try {
    const response = await fetch(TARGET_URL);
    let html = await response.text();

    // Esta linha injeta uma regra que força o navegador a buscar scripts e imagens no site original
    const baseTag = `<base href="${BASE_URL}/l/">`;
    html = html.replace('<head>', `<head>${baseTag}`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (error) {
    return res.status(500).send("Erro ao carregar");
  }
}
