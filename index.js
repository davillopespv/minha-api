require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuario", usuarioRoutes);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Conectado ao MongoDB com sucesso!");
  app.listen(3000, () => {
    console.log("🚀 Servidor rodando na porta 3000");
  });
})
.catch((err) => {
  console.error("❌ Erro ao conectar ao MongoDB:", err);
});
