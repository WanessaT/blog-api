
import dotenv from 'dotenv';
dotenv.config(); // Vai carregar as variáveis do .env
import cors from 'cors';
import express from 'express';
import postRoutes from './routes/postRoutes.js';


const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    next();
});

// Middleware para interpretar JSON nas requisições 
app.use(express.json());

// Usa as rotas de posts
app.use('/posts', postRoutes);

// Definindo a porta para o servidor 
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
