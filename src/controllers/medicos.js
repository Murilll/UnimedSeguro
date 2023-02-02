const adm = require('../model/adm');
const consulta = require('../model/consulta');
const medico = require('../model/medico');
const paciente = require('../model/paciente');
const { verConsultas } = require('./paciente');


module.exports = {
    async VerConsultas(req, res){
        let Consultas = [];
        
        const cookie = req.headers.cookie
        const dadosCookie = cookie.split(";")

        const nome1 = dadosCookie[2].split("=")
        const crm1 = dadosCookie[3].split("=")

        let nome = nome1[1]
        const crm = crm1[1]

        console.log(crm)
        console.log(nome)

        nome = nome.replace("%20"," ")
        const consultas = await consulta.findAll({
            raw: true,
            attribrutes: ["Data", "Time", "CPF_Paciente", "CPF_Medico"]
        })


        for(var c of consultas)
        {
            console.log(c.CPF_Medico)
            
            if(crm == c.CPF_Medico)
            {
                console.log('entrou')
                Consultas.push(c);
            }
        }

        res.render('../views/MedicoVerConsulta', {Consultas, nome});
    },
}