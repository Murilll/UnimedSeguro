
const adm = require('../model/adm');
const consulta = require('../model/consulta');
const medico = require('../model/medico');
const paciente = require('../model/paciente');


module.exports = {
    async Marcar(req, res) {
        const edv = req.params.id;
        const marcou = 'False'

        const cookie = req.headers.cookie
        const dadosCookie = cookie.split(";")

        const nome1 = dadosCookie[0].split("=")

        let nome = nome1[1]
        nome = nome.replace("%20", " ")
        console.log(nome)

        const medicos = await medico.findAll({
            raw: true,
            attribrutes: ["Nome", "CRM", "Area", "Foto", "CPF_Medico"]
        })

        const consultas = await consulta.findAll({
            raw: true,
            attribrutes: ["Data", "Time"]
        })

        res.render('../views/MarcarConsultas', { medicos, edv, consultas, marcou, area : " ", nome});
    },

    
    async MarcarConsulta(req, res) {
        const dados = req.body;
        const area = req.params.id

        const cookie = req.headers.cookie
        const dadosCookie = cookie.split(";")

        const nome1 = dadosCookie[0].split("=")
        const edv1 = dadosCookie[1].split("=")

        let nome = nome1[1]
        const edv = edv1[1]

        nome = nome.replace("%20", " ")

        const medicos = await medico.findAll({
            raw: true,
            attributes: ['CPF_Medico', 'Nome', 'Area'],
            where: { Area: area }
        });

        await consulta.create({
            Data: dados.date,
            Time: dados.Time,
            CPF_Paciente: dados.CPF_Paciente,
            CPF_Medico: dados.CPF_Medico
        })

        res.render('../views/PaginaInicialPaciente', { nome, edv, medicos});
    },

    async Filtrar(req, res) {
        let Disponiveis = []
        let dia = req.body;
        const area = req.params.id

        const cookie = req.headers.cookie
        

        const dadosCookie = cookie.split(";")

        const nome1 = dadosCookie[0].split("=")
        const edv1 = dadosCookie[1].split("=")
        const marcou = "True"

        let nome = nome1[1]
        const edv = edv1[1]

        dia = dia.date

        nome = nome.replace("%20", " ")
        
        const medicos = await medico.findAll({
            raw: true,
            attributes: ['CPF_Medico', 'Nome', 'Area'],
            where: { Area: area }
        });
        

        const consultas = await consulta.findAll({
            raw: true,
            attribrutes: ["Data", "Time", "CPF_Medico"]
        })


        for (let i = 8; i < 24 ; i++)
        {
            Disponiveis.push(i);
        }



        console.log(Disponiveis)
        for(var c of consultas)
        {

            if(c.Data == dia)
            {
                let index = Disponiveis.indexOf(parseInt(c.Time))
                Disponiveis.splice(index,1)
            }
        }

        res.render('../views/MarcarConsultas', { medicos, edv, consultas, nome, Disponiveis, marcou, dia, area});
        
    }

    
}