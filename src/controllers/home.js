const paciente = require("../model/paciente");
const medico = require("../model/medico");
const ambulatorio = require("../model/adm");
const consulta = require("../model/consulta");
const { response } = require("express");


module.exports = {
    async pagInicialGet(req, res) {
        res.render('../views/Login');
    },

    async pagLogin(req, res) {
        const id = req.params.id;
        res.render('../views/Dados', { id });
    },

    async VerificarLogin(req, res) {
        const dados = req.body
        const id = req.params.id;


        if (dados.documento && dados.senha) {
            if (id == '1') {
                const pacientes = await paciente.findAll({
                    raw: true,
                    attribrutes: ["CPF_Paciente", "Senha", "Nome"]
                })

                pacientes.forEach(ele => {

                    if (dados.documento == ele.EDV && dados.senha == ele.Senha) {
                        const nome = ele.Nome;
                        const edv = ele.CPF_Paciente;

                        res.cookie('UserName', nome)
                        res.cookie('UserEdv', edv)

                        res.render('../views/PaginaInicialPaciente', {nome, edv});
                    }
                });
            }
            else if (id == '2') {
                const medicos = await medico.findAll({
                    raw: true,
                    attribrutes: ["CRM", "Senha", "Nome"]
                })

                medicos.forEach(ele => {

                    if (dados.documento == ele.CRM && dados.senha == ele.Senha) {
                        const nome = ele.Nome;
                        res.render('../views/MedicoTela', {nome});
                    }

                });
            }
            else if (id == '3') {
                const ambulatorios = await ambulatorio.findAll({
                    raw: true,
                    attribrutes: ["CPF", "Senha", "Nome"]
                })

                ambulatorios.forEach(ele => {

                    if (dados.documento == ele.CPF && dados.senha == ele.Senha) {
                        const nome = ele.Nome;
                        res.render('../views/ADM', {nome});
                    }
                    
                });
            }
        }
    }
}