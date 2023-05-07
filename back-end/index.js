const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
var path = require('path');
const { buscarProdutos, buscarEstoque, buscarMovimentacao, buscarRequisicao, inserirProduto, inserirRequisicao, removerProduto, removerDoEstoque } = require('./db');

const port = 5000;

app.use( session ({ secret: 'shauidxbgsaiuxsavbxsiauxvxuiaxvsaxsauisavasui'}));
app.use(express.json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}));

app.use(cors());

app.get('/api/manipular_requisicao', async (req, res) => {

    

})


app.get('/api/inserir_requisicao', async (req, res) => {
    const inserir_requisicao = await inserirRequisicao(1, 1, 5)
    res.json(inserir_requisicao)

})

app.get('/api/remover_produto_estoque', async function(req, res) {
    const remocao_estoque = await removerDoEstoque('Bonequinho do Star Wars', 2)
    res.json(remocao_estoque)
})


app.get('/api/remover_produto', async function(req, res) {
    const remocao_produto = await removerProduto('Bonequinho do Star Wars')
    res.json(remocao_produto)
})

app.get('/api/insercao_de_produto', async function(req, res) {
    // const { nome_produto, qtd_produto, valor_produto } = JSON.stringify(req.body);
    // // Fazer algo com os dados recebidos
    // const resultado = await inserirProduto(nome_produto, qtd_produto, valor_produto);
    // console.log(resultado)
    // res.send('Enviado.', resultado);

    const insercao = await inserirProduto('Bonequinho do Star Wars', 100, 8)
    res.json(insercao)
})

app.get('/produtos', async (req, res) => {
    const resultado = await buscarProdutos();
    res.json(resultado);
})

app.get('/estoque', async (req, res) => {
    const resultado = await buscarEstoque();
    res.json(resultado);
})

app.get('/movimentacao', async (req, res) => {
    const resultado = await buscarMovimentacao();
    res.json(resultado);
})

app.get('/requisicoes', async (req, res) => {
    const resultado = await buscarRequisicao();
    res.json(resultado);
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})