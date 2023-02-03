const paciente = require("../model/paciente");
const medico = require("../model/medico");
const ambulatorio = require("../model/adm");
const consulta = require("../model/consulta");
const { response } = require("express");
const { where } = require("sequelize");


module.exports = {
    async pagPerfil(req, res) {
        const id = req.params.id;
        const cookie = req.headers.cookie
        const dadosCookie = cookie.split(";")

        const nome1 = dadosCookie[0].split("=")
        const edv1 = dadosCookie[1].split("=")

        let nome = nome1[1]
        const edv = edv1[1]

        nome = nome.replace("%20", " ")

        const pacientes = await paciente.findByPk(id,{
            raw: true,
            attribrutes: ["Nome", "CRM", "Area", "Foto", "CPF_Medico"]
        })

        res.render('../views/perfilPaciente',{pacientes, nome})
    },

    async verConsultas(req,res) {
        let Consultas = [];
        const cookie = req.headers.cookie
        const dadosCookie = cookie.split(";")

        const edv1 = dadosCookie[1].split("=")
        const nome1 = dadosCookie[0].split("=")

        let nome = nome1[1]
        const edv = edv1[1]

        nome = nome.replace("%20", " ")

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

        res.render('../views/ConsultasMarcadas', {Consultas, nome})
    }
}