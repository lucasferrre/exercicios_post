const express = require('express');
const app = express();
const PORT = 8081;

// Eu quero que o express entenda json eu coloco esse midleware para valer para todas as rotas
app.use(express.json());

// função para validar os números com uma checagem mais estrita
async function validaNumeros(pNumUm, pNumDois, pNumTres) {
    try {
        // A checagem isNaN() sozinha é muito permissiva, pois ela converte strings em números ("10" vira 10).
        // Para resolver isso sem usar 'typeof', adicionamos uma comparação estrita.
        // A condição `pNumUm !== parseFloat(pNumUm)` será verdadeira para qualquer string (ex: "10" !== 10),
        // mas será falsa para um número de verdade (ex: 10 !== 10), barrando os valores que são strings.
        // Combinamos as duas checagens para garantir que APENAS números sejam aceitos.
        if (isNaN(parseFloat(pNumUm)) || pNumUm !== parseFloat(pNumUm) ||
            isNaN(parseFloat(pNumDois)) || pNumDois !== parseFloat(pNumDois) ||
            isNaN(parseFloat(pNumTres)) || pNumTres !== parseFloat(pNumTres)) {
            throw new Error("Os valores digitados são inválidos ou não são do tipo número.");
        }

        const numero1 = pNumUm;
        const numero2 = pNumDois;
        const numero3 = pNumTres;
        return { numero1, numero2, numero3 };

    } catch (error) {
        // Apenas relança o erro para ser capturado pela rota, sem criar um novo Error.
        throw error;
    }
}

// função para calcular a soma dos 3 números
async function calcSoma(pNumUm, pNumDois, pNumTres) {
    try {
        const { numero1, numero2, numero3 } = await validaNumeros(pNumUm, pNumDois, pNumTres);
        const soma = numero1 + numero2 + numero3;
        return soma;

    } catch (error) {
        // Apenas relança o erro para ser tratado na rota.
        throw error;
    };
};


app.post('/soma', async (req, res) => {
    try {
        //desestruturação
        const { numUm, numDois, numTres } = req.body;
        const resultado = await calcSoma(numUm, numDois, numTres);
        console.log(`Informações válidas! soma = ${resultado}!`);
        // coloco o status 201 pois quando faço um post eu 
        // estou criando um novo registro/requisição, sempre que usarmos post usamos o 201
        res.status(201).json({ message: `Dados recebidos com sucesso no servidor.`, soma: `O resultado da soma é: ${resultado}` })
    } catch (error) {
        console.error(error.message); // Loga apenas a mensagem do erro para um log mais limpo.
        
        // Status 400 (Bad Request) é mais apropriado para um erro de validação de dados enviados pelo cliente.
        res.status(400).json({
            message: 'Ocorreu um erro de validação!',
            errorMessage: error.message
        });
    }
})


// rota para erro 404 quando a página não for encontrada em relação a URL
app.use((req, res) => {
    res.status(404).send('Página não encontrada!');
});

// start do servidor
app.listen(PORT, () => {
    console.log(`servidor respondendo em: http://localhost:${PORT}`);
});
