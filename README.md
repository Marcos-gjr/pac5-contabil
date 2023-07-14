<!--te-->
<h1 align="center">
  Projeto "StockEasy" Finalizado
</h1>

### Rodando o Projeto 

```bash
# Antes de tudo, realize a criação do banco de dados conforme o script disponibilizado na raíz do projeto (stockEasyBD.sql)
# Nesse banco de dados, você já terá dados fictícios para visualizar as funcionalidades do sistema.

# Clone este repositório
$ git clone https://github.com/Marcos-gjr/pac5-contabil.git

# Acesse a pasta do projeto no terminal/cmd 
$ cd pac5-contabil

# Acesse a pasta "backend" e instale as dependências necessárias relacionadas ao NodeJS e retorne a pasta raíz
$ cd backend
$ npm install express mysql2 cors body-parser
$ cd ..

# Acesse a pasta "frontend" e instale as dependências necessárias  relacionadas ao ReactJS e retorne a pasta raíz
$ cd frontend
$ npm install react-scripts react-router-dom react-toastify axios xml-js moment @nivo @nivo/funnel
$ cd ..

# Tenha 2 terminais simultâneos para que seja possível rodar o servidor NodeJS e ReactJS

# Execute a aplicação NodeJS entrando na pasta "backend" no primeiro terminal
$ cd backend
$ node index.js

# Execute a aplicação ReactJS entrando na pasta "frontend" no segundo terminal
$ cd frontend
$ npm start

# O servidor irá se iniciar na porta:3000 - acesse <http://localhost:3000> caso não tenha aberto sozinho
# Caso queira testar as rotas do NodeJS, o servidor está configurado para iniciar na porta:5000 - rota de exemplo
# http://localhost:5000/api/getUsuarios (Que irá retornar um JSON de todos os usuários cadastrados no banco de dados)
```

### Tecnologias utilizadas 
As seguintes ferramentas foram utilizadas no desenvolvimento deste projeto:
- [ReactJS](https://pt-br.reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [Figma](https://www.figma.com/file/P25CE5hB9pVXozQZVpwwis/Untitled?type=design&node-id=0%3A1&t=g0tTvW62em3QJZfY-1)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [Github Actions](https://docs.github.com/pt/actions)
  
---

Made by:

 - Marcos Jr [See LinkedIn](https://www.linkedin.com/in/marcos-gon%C3%A7alves-bbb17a1b5)
 - Victor Hugo [See LinkedIn](https://www.linkedin.com/in/victorbkuhn/)
 - Wesley Sardi [See LinkedIn](https://www.linkedin.com/in/wesleysardi/)
 - Davi Prudente [See LinkedIn](https://www.linkedin.com/in/daviprudente/)
