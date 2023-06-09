import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Produtos.css';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../utils/locales';

const Produtos = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getProdutosComEstoque");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const excluirProduto = (id) => {
    if (window.confirm("Você tem certeza que deseja excluir esse produto?")) {
      axios.delete(`http://localhost:5000/api/excluirProduto/${id}`)
        .then((response) => {
          toast.success("Produto excluído com sucesso.");
          loadData();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao excluir o produto.");
        });
    }
  };

  const filterData = (data) => {
    return data.filter(
      (produto) =>
        produto.nome_produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.id_produto.toString().includes(searchTerm)
    );
  };

  return (
    <div className="Produto">
      <Header />
      <SideBar />

      <div className="table-container">
        <div className="campo-procurar">
          <input
            type="text"
            placeholder="Digite o nome do produto que você deseja encontrar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="clear"></div>
        </div>

        <Link to="/cadastrarProduto">
          <button className="btn btn-add-produto">Cadastrar Produto</button>
        </Link>
        <Link to="/criarRequisicao">
          <button className="btn btn-add-produto">+ Requisição</button>
        </Link>
        <table className="main-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Código</th>
              <th style={{ textAlign: "center" }}>Descrição</th>
              <th style={{ textAlign: "center" }}>Valor</th>
              <th style={{ textAlign: "center" }}>Qtde. Estoque</th>
              <th style={{ textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filterData(data).map((produto, index) => (
              <tr key={produto.id_produto}>
                <th scope="row">{index + 1}</th>
                <td>{produto.id_produto}</td>
                <td>{produto.nome_produto}</td>
                <td>{produto.valor_produto.formatCurrency()}</td>
                <td>{produto.qtd_produto_estoque}</td>
                <td>
                  <Link to={`/editarProduto/${produto.id_produto}`}>
                    <button className="btn btn-edit">Editar</button>
                  </Link>
                  <button
                    className="btn btn-excluir"
                    onClick={() => excluirProduto(produto.id_produto)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produtos;