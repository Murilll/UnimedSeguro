const sequelize = require('sequelize');

//configurações da base de dados
const database = new sequelize('UnimedBosch', 'UnimedMuriloRamirez', 'criasdabosch',
{
 dialect: 'mssql', host:'localhost', port: 49682
});

database.sync();

module.exports = database;