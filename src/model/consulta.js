const Sequelize = require('sequelize');
const database = require('../config/db');
const paciente = require('./paciente');
const medico = require('./medico');

// Criando a tabela Sala
const consulta = database.define('Consulta', {
    IDConsulta: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },

    Data: {
    type: Sequelize.DATE,
    allowNull: false
    },

    Time: {
    type: Sequelize.TIME,
    allowNull: true
    }
});

consulta.belongsTo(paciente, {
    constraint: true,
    foreignKey: 'CPF_Paciente'
});

consulta.belongsTo(medico, {
    constraint: true,
    foreignKey: 'CPF_Medico'
});

// Exportando essa tabela
module.exports = consulta;
