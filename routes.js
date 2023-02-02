// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Iniciando Multer
const multer = require("multer");
// Recebendo arquivo do multer que criamos
const config = require('./src/config/multer');

// Importando os Controllers
const home = require('./src/controllers/home');
const cadastro = require('./src/controllers/cadastro');
const consultas = require('./src/controllers/consultas');
const paciente = require('./src/controllers/paciente');
const adms = require('./src/controllers/adms');
const medicos = require('./src/controllers/medicos');
const filtro = require('./src/controllers/filtro');

// Iniciando as rotas
route.get('/', home.pagInicialGet);
route.get('/Login/:id', home.pagLogin);
route.post('/Verificar/:id', home.VerificarLogin);


route.get('/Cadastrar', cadastro.paciente);
route.post('/Cadastrar', cadastro.pacienteInsert);


route.get('/CadastrarMedico', cadastro.medico);
route.post('/CadastrarMedico', multer(config).single('Foto'), cadastro.medicoInsert);


route.get('/CadastrarADM', cadastro.adm);
route.post('/CadastrarADM', cadastro.admInsert);


route.post('/MarcarConsultaFiltro', filtro.filtrarMedicoPost);


route.get('/MarcarConsulta/:id', consultas.Marcar);
route.post('/MarcarConsulta', consultas.MarcarConsulta);
route.post('/FiltroData', consultas.Filtrar)


route.get('/perfilPaciente/:id', paciente.pagPerfil);
route.get('/verConsultas', paciente.verConsultas);


route.get('/VerConsultasADM', adms.VerConsultas)
route.get('/VerMedicosADM', adms.VerMedicos)


route.get('/MedicoVerConsultas', medicos.VerConsultas)
module.exports = route;
