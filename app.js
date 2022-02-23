const express = require('express');
const app= require();
const rotaProdutos = require('./src/controllers/routes/produtos')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rotaUsuarios = require('./src/controllers/routes/usuarios');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/produtos', rotaProdutos);
app.use('/usuarios',rotaUsuarios);

module.exports = app;