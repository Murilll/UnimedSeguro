// Importando as tabelas do DB
const adm = require('../model/adm');
const consulta = require('../model/consulta');
const medico = require('../model/medico');
const paciente = require('../model/paciente');

module.exports = {
    async adm(req, res) {
        res.render('../views/CadastrarADM');
    },

    async admInsert(req, res) {

        // Recebe as informações do front-end
        const dados = req.body;

        // Criando sala no banco de dados
        await adm.create({
            Nome: dados.Nome,
            CPF_ADM: dados.CPF_ADM,
            Idade: dados.Idade,
            Senha: dados.Senha
        });

        // Redirecionar para a página principal
        res.redirect('/');
    },

    async consulta(req, res) {
        res.render('../views/Login');
    },

    async consultaInsert(req, res) {

        // Recebe as informações do front-end
        const dados = req.body;

        // Criando sala no banco de dados
        await consulta.create({
            Data: dados.data,
            Time: dados.time
        });

        // Redirecionar para a página principal
        res.redirect('/');
    },

    async medico(req, res) {
        res.render('../views/CadastrarMedico');
    },

    async medicoInsert(req, res) {

        // Recebe as informações do front-end
        const dados = req.body;

        let Foto = 'usuario.png';

        // Verificando se foi enviada alguma foto
        if (req.file) {
            // Pegar novo nome da foto
            Foto = req.file.filename;
        }

        // Criando sala no banco de dados
        await medico.create({
            Nome: dados.Nome,
            CPF_Medico: dados.CPF_Medico,
            Idade: dados.Idade,
            CRM: dados.CRM,
            Senha: dados.Senha,
            Area: dados.Area,
            Foto: Foto
        });

        // Redirecionar para a página principal
        res.redirect('/');
    },

    async paciente(req, res) {
        res.render('../views/Cadastrar');
    },

    async pacienteInsert(req, res) {

        // Recebe as informações do front-end
        const dados = req.body;

        // Criando sala no banco de dados
        await paciente.create({
            Nome: dados.Nome,
            CPF_Paciente: dados.CPF_Paciente,
            Idade: dados.Idade,
            EDV: dados.EDV,
            Senha: dados.Senha
        });

        // Redirecionar para a página principal
        res.redirect('/');
    }
}
