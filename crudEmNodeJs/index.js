const express = require('express');
const server = express();
server.use(express.json());

const produtos = require('./data.js');

server.listen(3000, () => {
    console.log('Server escutando pela porta 3000.');
});

// Método POST 
server.post('/api/produto', (req, res) => {
    const novoProduto = {
        id : produtos.length + 1,
        nome : req.body.nome,
        valor : req.body.valor
    }
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// Método GET para todos os produtos
server.get('/api/produto', (req, res) => {
    res.send(produtos);
});

// Método GET para produtos específicos
server.get('/api/produto/:produtoId', (req, res) => {
    const id = Number(req.params.produtoId);
    const produto = produtos.find(produto => produto.id === id);
    if(!produto){
        return res.status(404).send('Produto não encontrado');
    }
    res.json(produto);
});

// Método PUT
server.put('/api/produto/:produtoId', (req, res) => {
    const id = Number(req.params.produtoId);
    const index = produtos.findIndex(produto => produto.id === id);
    if(index === -1){
        return res.status(404).send('Produto não encontrado.');
    }
    const produtoAtualizado = {
        id : produtos[index].id,
        nome : req.body.nome,
        valor : req.body.valor
    }
    produtos[index] = produtoAtualizado;
    res.status(200).json('Produto atualizado !');
});

// Método DELETE
server.delete('/api/produto/:produtoId', (req, res) => {
    const id = Number(req.params.produtoId);
    const index = produtos.findIndex(produto => produto.id === id);
    if(index === -1){
        return res.status(404).send('Produto não encontrado.');
    }
    
    produtos.splice(index, 1);
    res.status(200).json('Produto deletado !');
});