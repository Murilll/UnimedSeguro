const adm = require('../model/adm');
const consulta = require('../model/consulta');
const medico = require('../model/medico');
const paciente = require('../model/paciente');


module.exports = {
    async Marcar(req, res) {
        const edv = req.params.id;
        const medicos = await medico.findAll({
            raw: true,
            attribrutes: ["Nome", "CRM", "Area", "Foto", "CPF_Medico"]
        })

        const consultas = await consulta.findAll({
            raw: true,
            attribrutes: ["Data", "Time"]
        })

        res.render('../views/MarcarConsultas', { medicos, edv, consultas});
    },

    async MarcarConsulta(req, res) {
        const dados = req.body;

        const cookie = req.headers.cookie
        const dadosCookie = cookie.split(";")

        const nome1 = dadosCookie[0].split("=")
        const edv1 = dadosCookie[1].split("=")

        let nome = nome1[1]
        const edv = edv1[1]

        nome = nome.replace("%20", " ")

        await consulta.create({
            Data: dados.date,
            Time: dados.Time,
            CPF_Paciente: dados.CPF_Paciente,
            CPF_Medico: dados.CPF_Medico
        })

        res.render('../views/PaginaInicialPaciente', { nome, edv });
    },

    
}