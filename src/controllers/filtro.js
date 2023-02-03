const adm = require('../model/adm');
const consulta = require('../model/consulta');
const medico = require('../model/medico');
const paciente = require('../model/paciente');

module.exports = {
    // async filtrarMedicoget(req, res){

    //     const medicos = await medico.findAll({ 
    //         raw: true,
    //         attributes: ['CPF_Medico', 'Nome', 'Area'] 
    //     });

    //     const MedicoTeste = await medico.findAll();

    //     res.render('../views/MarcarConsulta', {medicos, MedicoTeste, id:''});
    // },

    // async filtrarMedicoPost(req, res){

    //     // Pegando os dados da requisição
    //     const id = req.body.CPF_Medico;

    //     const medicos = await medico.findAll({ 
    //         raw: true,
    //         attributes: ['CPF_Medico', 'Nome', 'Area']});

    //     const MedicoTeste = await medico.findAll({
    //         raw: true,
    //         attributes: ['CPF_Medico', 'Nome', 'Area'],
    //         where: { CPF_Medico: id }
    //     });

    //     const medicoSelecionadas = await medico.findByPk(id, {
    //         raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
    //         attributes: ['CPF_Medico', 'Nome', 'Area']
    //     });

    //     console.log(medicoSelecionadas)
    //     res.render('../views/MarcarConsulta', {medicos, MedicoTeste, id, medicoSelecionadas});
    // }

    async filtrarMedicoget(req, res) {

        // const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });

        const medicos = await medico.findAll();

        res.render('../views/MarcarConsultas', { medicos, medicoSelecionados: " " });

    },

    async filtrarMedicoPost(req, res) {

        const Area = req.body;

        const cookie = req.headers.cookie
        const dadosCookie = cookie.split(";")

        const nome1 = dadosCookie[2].split("=")
        const edv1 = dadosCookie[3].split("=")

        let nome = nome1[1]
        const edv = edv1[1]
        nome = nome.replace("%20", " ")
        const area = Area.nome
        const medicos = await medico.findAll({
            raw: true,
            attributes: ['CPF_Medico', 'Nome', 'Area'],
            where: { Area: area }
        });

        console.log(medicos)
        let marcou = 'false'
        res.render('../views/MarcarConsultas', { medicos, edv, marcou, area, nome});
    }
}