const express = require('express');
const app = express();
const PORT = 8081;

// Eu quero que o express entenda json eu coloco esse midleware para valer para todas as rotas
app.use(express.json());

// função para validar os números 
async function validaNumeros(pNumUm, pNumDois, pNumTres) {
    try {
         if ( isNaN(pNumUm) || isNaN(pNumDois) || isNaN(pNumTres)) {
            throw new Error("Os valores digitados são inválidos");
        }
        const numero1 =  parseFloat(pNumUm)
        const numero2 =  parseFloat(pNumDois) 
        const numero3 = parseFloat(pNumTres)
        return{numero1, numero2, numero3}

    } catch (error) {
        throw new Error(error);
    }
}

// função para calcular a soma dos 3 números
async function calcSoma(pNumUm, pNumDois, pNumTres) {
    try {
        const {numero1,numero2,numero3} = await validaNumeros(pNumUm,pNumDois,pNumTres);
        const soma = numero1 + numero2 + numero3;
        return soma;

    } catch (error) {
        throw new Error(error);
    };
};


app.post('/soma', async (req,res) => {
    try {
          //desestruturação
        const {numUm, numDois, numTres} = req.body;
        const resultado = await calcSoma(numUm, numDois, numTres);
        console.log(`O resultado é da soma é: ${resultado}!`);
        // coloco o status 201 pois quando faço um post eu 
        // estou criando uma novo registro/requisição, sempre que usarmos post usamos o 201
        res.status(201).json ({message:`Dados recebidos com sucesso no servidor.`})

        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Ocorreu um erro ao processar a solicitação!',
            errorMessage: error.message});
        }
})


// rota para erro 404 quando a página não for encontrada em relação a URL
app.use((req, res) => {
    res.status(404).send('Página não encontrada!');
});

// start do servidor
app.listen(PORT, ()=>{
    console.log(`servidor respondendo em: http://localhost:${PORT}`);
});

