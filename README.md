# Back-End Projeto 2 — Streaming de Vídeos (YouTube)

Aplicação web desenvolvida com **Express.js** utilizando as classes do Projeto 1 como base.

## Tecnologias

- Node.js
- Express.js
- express-session (autenticação por sessão)
- MongoDB (driver nativo)
- dotenv

## Instalação

```bash
npm install
```

Configure o arquivo `.env`:
```
MONGO_URI=mongodb://127.0.0.1:27017
DB_NAME=banco_projeto
SESSION_SECRET=segredo_projeto2_youtube
PORT=3000
```

## Iniciar servidor

```bash
npm start
```

---

## Rotas da API

### Autenticação (`/auth`)

| Método | Rota          | Descrição                        | Auth? |
|--------|---------------|----------------------------------|-------|
| POST   | /auth/login   | Faz login e inicia sessão        | Não   |
| POST   | /auth/logout  | Encerra a sessão                 | Sim   |
| GET    | /auth/me      | Retorna dados do usuário logado  | Não   |

**Login — Body:**
```json
{ "email": "usuario@email.com", "senha": "123456" }
```

---

### Usuários (`/users`)

| Método | Rota              | Descrição                  | Auth? |
|--------|-------------------|----------------------------|-------|
| GET    | /users/list       | Lista todos os usuários    | Sim   |
| GET    | /users/find/:id   | Busca usuário por ID       | Sim   |
| POST   | /users/create     | Cadastra novo usuário      | Não   |
| DELETE | /users/delete/:id | Deleta usuário             | Sim   |

**Criar usuário — Body (campos obrigatórios):**
```json
{ "nome": "João", "email": "joao@email.com", "senha": "123456" }
```

---

### Vídeos (`/videos`)

| Método | Rota               | Descrição               | Auth? |
|--------|--------------------|-------------------------|-------|
| GET    | /videos/list       | Lista todos os vídeos   | Não   |
| GET    | /videos/find/:id   | Busca vídeo por ID      | Não   |
| POST   | /videos/upload     | Cadastra novo vídeo     | Sim   |
| DELETE | /videos/delete/:id | Deleta vídeo            | Sim   |

**Upload de vídeo — Body (campos obrigatórios):**
```json
{
  "titulo": "Meu Vídeo",
  "descricao": "Descrição opcional",
  "url": "https://exemplo.com/video.mp4",
  "duracao": "10:30"
}
```

---

### Playlists (`/playlists`)

| Método | Rota                         | Descrição                        | Auth? |
|--------|------------------------------|----------------------------------|-------|
| GET    | /playlists/list              | Lista todas as playlists         | Não   |
| GET    | /playlists/find/:id          | Busca playlist por ID            | Não   |
| GET    | /playlists/usuario/:id       | Playlists de um usuário          | Sim   |
| POST   | /playlists/create            | Cria nova playlist               | Sim   |
| POST   | /playlists/addvideo          | Adiciona vídeo à playlist        | Sim   |
| DELETE | /playlists/delete/:id        | Deleta playlist                  | Sim   |

**Criar playlist — Body:**
```json
{ "nome": "Minha Playlist", "descricao": "Opcional" }
```

**Adicionar vídeo — Body:**
```json
{ "playlistId": "<id>", "videoId": "<id>" }
```

---

## Fluxo típico de uso

1. `POST /users/create` — cadastrar usuário
2. `POST /auth/login` — fazer login (inicia sessão)
3. `POST /videos/upload` — enviar vídeo (requer sessão)
4. `POST /playlists/create` — criar playlist (requer sessão)
5. `POST /playlists/addvideo` — adicionar vídeo à playlist
6. `POST /auth/logout` — encerrar sessão
