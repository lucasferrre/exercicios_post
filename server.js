const express = require('express');
const app = express();
const PORT = 8081;

// nesse caso eu quero que o express entenda json, ent eu coloco esse midleware para valer para todas as rotas
app.use(express.json());

// Crie uma projeto com que tenha uma rota POST /mensagem que atenda as seguintes necessidades:
app.post('/mensagem', (req, res) => {
    try {
        //desestruturação
        const {nome, idade, time_favorito} = req.body; // no post a gente requere ele com body que é o corpo da rquisição
        console.log(`Olá ${nome}! Você tem ${idade} anos e torce para o ${time_favorito}!`);
        // coloco o status 201 pois quando faço um post eu 
        // estou criando uma novo registro/requisição, sempre que usarmos post usamos o 201
        res.status(201).json ({message:`Dados recebidos com sucesso no servidor.`})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Ocorreu um erro ao processar a solicitação!',
        errorMessage: error.message});
    }

});

// rota para erro 404 quando a página não for encontrada em relação a URL
app.use((req, res) => {
    res.status(404).send('Página não encontrada!');
});

// start do servidor
app.listen(PORT, ()=>{
    console.log(`servidor respondendo em: http://localhost:${PORT}`);
});