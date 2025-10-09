const express = require('express');
const app = express();
const PORT = 8081;


// nesse caso eu quero que o express entenda json eu coloco esse midleware para valer para todas as rotas
app.use(express.json());

// função para validar o usuario 
async function validaUsuario(pUsuario, pSenha) {
    try {
        if (pUsuario === 'admin' && pSenha === 1234) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        throw new Error(error);
    }
}


// rota para o login
app.post('/login', async (req,res) => {
    try {
        const {usuario, senha} = req.body;
        const resultado = await validaUsuario(usuario, senha);
        if (resultado === true) {
            console.log(`Usuário validado com sucesso!`); 
             // coloco o status 201 pois quando faço um post eu 
            // estou criando uma novo registro/requisição, sempre que usarmos post usamos o 201
            res.status(201).json ({message:`Dados recebidos com sucesso no servidor. Seja bem vindo ${usuario}!`});  
        }else{
            console.log(`Usuário inválido!`);
             // coloco o status 201 pois quando faço um post eu 
            // estou criando uma novo registro/requisição, sempre que usarmos post usamos o 201
            res.status(400).json ({message:`Servidor não pode processar sua solicitação devido a um erro de sintaxe inválida, tente novamente!`});
        }
      
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Ocorreu um erro ao processar a solicitação!',
        errorMessage: error.message});
    };
});


// rota para erro 404 quando a página não for encontrada em relação a URL
app.use((req, res) => {
    res.status(404).send('Página não encontrada!');
});

// start do servidor
app.listen(PORT, ()=>{
    console.log(`servidor respondendo em: http://localhost:${PORT}`);
});

