const paciente = require("../model/paciente");
const medico = require("../model/medico");
const ambulatorio = require("../model/adm");
const consulta = require("../model/consulta");
const { response } = require("express");
const { where } = require("sequelize");


module.exports = {
    async pagPerfil(req, res) {
        const id = req.params.id;

        const pacientes = await paciente.findByPk(id,{
            raw: true,
            attribrutes: ["Nome", "CRM", "Area", "Foto", "CPF_Medico"]
        })

        res.render('../views/perfilPaciente',{pacientes})
    },

    async verConsultas(req,res) {
        let Consultas = [];

        const cookie = req.headers.cookie
        const dadosCookie = cookie.split(";")

        const edv1 = dadosCookie[1].split("=")

        const edv = edv1[1]


        const consultas = await consulta.findAll({
            raw: true,
            attribrutes: ['Data','Time','CPF_Paciente','CPF_Medico']
        })

        for(var c of consultas)
        {
            if(edv == c.CPF_Paciente)
            {
                Consultas.push(c);
            }
        }

        res.render('../views/ConsultasMarcadas', {Consultas})
    }
}