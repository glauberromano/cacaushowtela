export default async function handler(req, res) {
  // O link real do seu checkout
  const TARGET_URL = "https://phantoms.group/l/cacaushow?shk=f4jzf8lf";
  
  // Pega as UTMs da URL atual
  const url = new URL(req.url, `https://${req.headers.host}`);
  const searchParams = url.search;

  // Monta o link final com as UTMs e redireciona o cliente
  const finalUrl = TARGET_URL + (searchParams ? "&" + searchParams.slice(1) : "");
  
  res.writeHead(302, { Location: finalUrl });
  res.end();
}
