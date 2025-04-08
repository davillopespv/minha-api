const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaCriptografada = await bcrypt.hash(senha, 8);
  try {
    const usuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

exports.getUsuario = async (req, res) => {
  
  if (req.usuarioId !== req.params.id) {
    return res.status(403).json({ erro: "Acesso negado" });
  }

  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
};

exports.atualizarUsuario = async (req, res) => {
  if (req.usuarioId !== req.params.id) {
    return res.status(403).json({ erro: "Você só pode atualizar sua própria conta" });
  }

  try {
    const dados = req.body;
    if (dados.senha) dados.senha = await bcrypt.hash(dados.senha, 8);
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, dados, { new: true });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar usuário" });
  }
};

exports.deletarUsuario = async (req, res) => {
  if (req.usuarioId !== req.params.id) {
    return res.status(403).json({ erro: "Você só pode deletar sua própria conta" });
  }

  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ erro: "Erro ao deletar usuário" });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
};

exports.numeroAleatorio = (req, res) => {
  const numero = Math.floor(Math.random() * 1000);
  res.json({ numero });
};
