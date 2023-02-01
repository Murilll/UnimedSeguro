const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Sala
const paciente = database.define('Paciente', {
    Nome: {
    type: Sequelize.STRING(50),
    allowNull: false
    },

    CPF_Paciente: {
    type: Sequelize.STRING(14),
    allowNull: false,
    primaryKey: true
    },

    Idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    EDV: {
        type: Sequelize.STRING(8),
        allowNull: false
    },

    Senha: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

// Exportando essa tabela
module.exports = paciente;
