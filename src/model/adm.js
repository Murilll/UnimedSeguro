const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Sala
const adm = database.define('ADM', {
    IDADM: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },

    Nome: {
        type: Sequelize.STRING(50),
        allowNull: false
        },
    
    CPF_ADM: {
        type: Sequelize.STRING(14),
        allowNull: false
        },

    Idade: {
        type: Sequelize.INTEGER,
        allowNull: false
        },

    Senha: {
        type: Sequelize.STRING(100),
        allowNull: false
        }
});

// Exportando essa tabela
module.exports = adm;
