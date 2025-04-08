const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middleware/authMiddleware"); 
router.post("/", usuarioController.criarUsuario);
router.post("/login", usuarioController.login);

router.get("/", auth, usuarioController.listarUsuarios);
router.get("/:id", auth, usuarioController.getUsuario);
router.patch("/:id", auth, usuarioController.atualizarUsuario);
router.delete("/:id", auth, usuarioController.deletarUsuario);
router.get("/numero/aleatorio", auth, usuarioController.numeroAleatorio);

module.exports = router;
