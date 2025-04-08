📦 Projeto API de Usuários com Autenticação JWT

Este projeto é uma API RESTful desenvolvida com Node.js, Express e MongoDB para gerenciamento de usuários, incluindo autenticação via JWT (JSON Web Token). O foco do projeto é aplicar segurança nas rotas protegidas, garantindo que apenas usuários autenticados possam acessar, atualizar ou deletar seus próprios dados.

🚀 Tecnologias Utilizadas

🔵 Node.js

🔵 Express

🔵 MongoDB + Mongoose

🔵 JWT (jsonwebtoken)

🔵 bcryptjs

🔵 dotenv

🔵 Postman (para testes)

🔐 Funcionalidade da Autenticação JWT

Após o login com email e senha válidos, o usuário recebe um token JWT.

Esse token deve ser enviado no header Authorization como Bearer para acessar rotas protegidas.

O middleware authmiddleware.js verifica o token e protege as rotas.

O usuário só pode acessar, editar ou deletar o próprio usuário (baseado no ID do token).

📁 Estrutura de Pastas

minha-api/ 
├── controllers/ 
│ └── usuarioController.js 
├── middlewares/ 
│ └── authMiddleware.js 
├── models/ 
│ └── Usuario.js 
├── routes/ 
│ └── usuarioRoutes.js 
├── .env 
├── index.js

✅ Rotas da API

Método Rota Ação Protegida🔒

POST /usuario Cria novo usuário ❌
POST /usuario/login Faz login e retorna JWT ❌
GET /usuario/:id Retorna dados do usuário autenticado ✅
PATCH /usuario/:id Atualiza dados do próprio usuário ✅
DELETE /usuario/:id Deleta o próprio usuário ✅
GET /usuario Lista todos os usuários ❌
GET /usuario/numero-aleatorio Retorna número aleatório ✅

🧪 Testes com Postman

Criar Usuário POST /usuario
Corpo:json

{ "nome": "Davi Lopes", "email": "davi@example.com", "senha": "123456" }

Login POST /usuario/login
Corpo:json

{ "email": "davi@example.com", "senha": "123456" }

Resposta: token JWT

Ver Dados do Usuário GET /usuario/:id
Headers: Authorization: Bearer

Resposta: Dados do próprio usuário

Atualizar Usuário
PATCH /usuario/:id

Headers: Authorization: Bearer

Corpo:json

{ "nome": "Davi Atualizado" }

Deletar Usuário
DELETE /usuario/:id

Headers: Authorization: Bearer

Listar Usuários
GET /usuario

⚠️ Regras de Segurança

Todas as rotas protegidas devem conter um token válido no cabeçalho.

Um usuário só pode acessar ou alterar/deletar a si mesmo.

Caso tente alterar outro usuário: 403 Acesso negado.

Sem token ou token inválido: 401 Unauthorized.

📌 Como Rodar o Projeto Instale as dependências:

npm install

Inicie o servidor:

npm start

💡 Considerações Projeto desenvolvido para fins didáticos, com foco em autenticação JWT e segurança de rotas.

Testes realizados com o Postman. link abaixo 👇🏻👇🏻
https://davi-7943842.postman.co/workspace/Davi's-Workspace~b686e959-b0a1-45a3-838e-95ccfbd92d72/collection/43637536-5429d29a-5639-4ae1-95c0-244e9b45f475?action=share&creator=43637536
