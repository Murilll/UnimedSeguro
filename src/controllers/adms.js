const adm = require('../model/adm');
const consulta = require('../model/consulta');
const medico = require('../model/medico');
const paciente = require('../model/paciente');


module.exports = {
    async VerConsultas(req, res){
        const consultas = await consulta.findAll({
            raw: true,
            attribrutes: ["Data","Time","CPF_Paciente","CPF_Medico"]
        })
        res.render('../views/ADMConsultas', {consultas});
    },

    async VerMedicos(req, res){
        const medicos = await medico.findAll({
            raw: true,
            attribrutes: ["Nome","CPF_Medico","Idade","CRM","Area"]
        })
        res.render('../views/ADMMedicos', {medicos});
    },
}