import express from "express";
import axios from "axios";
import cors from "cors"; // Para garantir que o frontend consiga acessar este servidor intermediário
const app = express();

// Habilitar CORS para todas as rotas
app.use(cors());

// Rota para buscar os dados da API externa
app.get('/weather', async (req, res) => {
  try {
    // Requisição à API externa
    const response = await axios.get('https://api.hgbrasil.com/weather?woeid=455836');
    res.json(response.data);  // Enviar os dados da API para o frontend
  } catch (error) {
    res.status(500).send('Erro ao buscar os dados.');
  }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta http://localhost:3000/weather');
});