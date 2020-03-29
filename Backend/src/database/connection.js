const knex = require('knex');

/**importando configurações do banco de dados */
const configuration = require('../../knexfile');

/**criando a conexão */
const connection = knex(configuration.development);

module.exports = connection;