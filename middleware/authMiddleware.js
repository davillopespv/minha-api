const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido ou mal formatado" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id; 
    next();
  } catch (err) {
    res.status(401).json({ erro: "Token inválido" });
  }
}

module.exports = verificarToken;
