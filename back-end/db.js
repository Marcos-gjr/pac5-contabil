const mysql = require('mysql2/promise');

async function connect() {
    // verificar se ja tem objeto de conexao
    // na secao de uso
    //---- fazer
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    //

    // cria uma conexao

    const conexao = await mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'gestao_produtos_contabilidade'
    })

    // avisa no console
    if (conexao) console.log("banco conectado");
    //console.log(conexao);

    // guarda o objeto de conexao para secao de uso
    global.connection = conexao;

    // retorna a conexao com o DB
    return global.connection
}

// Outras funcoes

async function otimizarBanco(){

    const con = await connect()
    // Vai olhar a dataAtual
    const dataAtual = gerarDataHoraAtual();

    // Procurar todas as datas
    const [todas_as_datas] = await con.query('SELECT data_requisicao FROM requisicoes;', (err, results) =>{
        if(err) throw err
        console.log(results)
    })
    // A gente tem que comparar com a data atual, e remover as que estão mais antigas (por exemplo um período de 30 dias)

}


async function manipularRequisicao(id_requisicao, status) {
    const con = await connect()
    const sql = `UPDATE requisicoes SET status = ? WHERE id_requisicao = ?`
    const valores = [status, id_requisicao]
    
    await con.query(sql, valores, (err, results) => {
        if (err) throw err

        if(status == 3){
            throw err = 'Pedido negado'
        }

        console.log(results)
    })
}


async function inserirRequisicao(id_produto, usuario, quantidade) {
    const con = await connect()
    const sql = `INSERT INTO requisicoes (id_usuario_requisicao, id_produto_requisicao, qtd_produto, status_produto, data_requisicao) VALUES (?, ?, ?, ?, ?);`
    
    const valores = [usuario, id_produto, quantidade, 1, gerarDataHoraAtual()]

    await con.query(sql, valores, (err, results) => {
        if (err) throw err

        console.log(results)
    })
}


async function removerDoEstoque(nome_prod, quantidade) {

    const con = await connect()


    // Pegar id_produto
    const id_produto = `SELECT id_produto FROM produtos WHERE nome_produto = ?;`
    const valores = [nome_prod]

    const [querySql] = await con.query(id_produto, valores, (err, results) => {
        if (err) throw err

        console.log(results)
    })

    item2 = JSON.stringify(querySql[0]);
    num = item2.substr(14, 4);
    num = parseInt(num);
    // Fim pegar id_produto


    const sql = 'UPDATE estoque SET qtd_produto_estoque = qtd_produto_estoque - ? WHERE id_produto_estoque = ?';
    const values = [quantidade, num];

    con.query(sql, values, function (err, results) {
        if (err) throw err;

        inserirMovimentacao(num, quantidade, 0)
        console.log('Estoque manipulado com sucesso!');
    });
}



// ----------------------------- Feito -----------------------------------

async function removerProduto(nome_prod) {

    const con = await connect();
    const id_produto = `SELECT id_produto FROM produtos WHERE nome_produto = ?;`
    const valores = [nome_prod]

    const [querySql] = await con.query(id_produto, valores, (err, results) => {
        if (err) throw err

        console.log(results)
    })

    item2 = JSON.stringify(querySql[0]);
    num = item2.substr(14, 4);
    num = parseInt(num);

    const sql = 'DELETE m, e, p FROM movimentacao m, estoque e, produtos p WHERE m.id_produto_movimentacao = ? AND e.id_produto_estoque = ? AND p.id_produto = ?;'

    const values = [num, num, num];

    con.query(sql, values, function (err, results) {
        if (err) throw err;

        console.log('Estoque manipulado com sucesso!');
    });
}

// Registro de movimentacao
async function manipularMovimentacao(id_produto, quantidade, status) {

    const con = await connect()

    const dataAtual = gerarDataHoraAtual()

    const sql = 'INSERT INTO movimentacao (id_produto_movimentacao, movimentacao_produto, data_movimentacao_produto, qtd_movimentacao_produto) VALUES (?, ?, ?, ?);';
    const values = [id_produto, status, dataAtual, quantidade];



    con.query(sql, values, function (err, results) {
        if (err) throw err;

        console.log('Nova movimentação!');
    });
}

// Insercao no estoque
async function inserirEstoque(nome_prod, quantidade) {

    const con = await connect();
    const id_produto = `SELECT id_produto FROM produtos WHERE nome_produto = ?;`
    const valores = [nome_prod]

    const [querySql] = await con.query(id_produto, valores, (err, results) => {
        if (err) throw err

        console.log(results)
    })

    item2 = JSON.stringify(querySql[0]);
    num = item2.substr(14, 4);
    num = parseInt(num);

    manipularMovimentacao(num, quantidade, 1)

    await con.query(`INSERT INTO estoque (id_produto_estoque, qtd_produto_estoque) VALUES ('${num}', '${quantidade}') ON DUPLICATE KEY UPDATE qtd_produto_estoque = qtd_produto_estoque + '${quantidade}';`)
    console.log("Produto adicionado no Banco, na Tabela Estoque.")
}

// Insercao de produto
async function inserirProduto(nome_prod, valor_prod, quantidade) {  //PRONTO A INSERCAO DE PRODUTOS

    const con = await connect()

    const produto = `SELECT id_produto FROM produtos WHERE nome_produto = ?;`
    const values = [nome_prod]

    const [querySql] = await con.query(produto, values, (err, results) => {
        if (err) throw err

        console.log(results)
    })

    item = querySql[0];

    console.log(item);

    if (!item) {
        await con.query(`INSERT INTO produtos (nome_produto, valor_produto) VALUES ('${nome_prod}', '${valor_prod}');`)
        inserirEstoque(nome_prod, quantidade);
    } else {
        inserirEstoque(nome_prod, quantidade);
    }
}

// Funcao que gera a data e hora atual
function gerarDataHoraAtual() {
    const timestampAtual = Date.now();
    const dataAtual = new Date(timestampAtual);
    const ano = dataAtual.getFullYear();
    const mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataAtual.getDate()).slice(-2);
    const horas = ('0' + dataAtual.getHours()).slice(-2);
    const minutos = ('0' + dataAtual.getMinutes()).slice(-2);
    const segundos = ('0' + dataAtual.getSeconds()).slice(-2);
    const dataFormatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    return dataFormatada;
}

// funcao que busca os produtos
async function buscarProdutos() {
    //pega ou cria uma conexao
    const con = await connect()
    // console.log(con);
    // executa um select no BD
    const [linhas] = await con.query('select * from produtos;')
    // console.log(linhas);
    return linhas
}

// funcao que busca os produtos
async function buscarEstoque() {
    //pega ou cria uma conexao
    const con = await connect()

    // executa um select no BD
    const [linhas] = await con.query('select * from estoque;')
    return linhas
}

// funcao que busca os produtos
async function buscarMovimentacao() {
    //pega ou cria uma conexao
    const con = await connect();
    // executa um select no BD
    const [linhas] = await con.query('select * from movimentacao;')
    return linhas
}

async function buscarRequisicao() {
    //pega ou cria uma conexao
    const con = await connect();
    // executa um select no BD
    const [linhas] = await con.query('select * from requisicoes;')
    return linhas
}

// executa a funcao connect
connect()

module.exports = { buscarProdutos, buscarEstoque, buscarMovimentacao, buscarRequisicao, inserirProduto, inserirRequisicao, removerDoEstoque, removerProduto }
