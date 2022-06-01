const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const MatriculaController = require('../controllers/MatriculaController')
const middlewaresAutenticacao = require('../utils/middlewares-autenticacao')

const router = Router()

router
    .post('/pessoas/login', middlewaresAutenticacao.local, PessoaController.login)
    .post('/pessoas/atualiza_token', middlewaresAutenticacao.refresh, PessoaController.login)
    .post('/pessoas/logout', [middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer], PessoaController.logout)
    .get('/pessoas', PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
    .get('/pessoas/:id', middlewaresAutenticacao.bearer, PessoaController.pegaUmaPessoa)
    .post('/pessoas', PessoaController.criaPessoa)
    .put('/pessoas/:id', middlewaresAutenticacao.bearer, PessoaController.atualizaPessoa)
    .delete('/pessoas/:id', middlewaresAutenticacao.bearer, PessoaController.apagaPessoa)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.pegaUmaMatricula)
    .post('/pessoas/:estudanteId/matriculas', middlewaresAutenticacao.bearer, MatriculaController.criaMatricula)
    .put('/pessoas/:estudanteId/matriculas/:matriculaId', middlewaresAutenticacao.bearer, MatriculaController.atualizaMatricula)
    .delete('/pessoas/:estudanteId/matriculas/:matriculaId', middlewaresAutenticacao.bearer, MatriculaController.apagaMatricula)
    .post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', middlewaresAutenticacao.bearer, MatriculaController.restauraMatricula)
    .get('/pessoas/:estudanteId/matriculas', middlewaresAutenticacao.bearer, MatriculaController.pegaMatriculas)
    .get('/pessoas/matriculas/:turmaId/confirmadas', MatriculaController.pegaMatriculasPorTurma)
    .get('/pessoas/matriculas/lotadas', MatriculaController.pegaTurmasLotadas)
    .post('/pessoas/:estudanteId/cancela', middlewaresAutenticacao.bearer, PessoaController.cancelaPessoa)

module.exports = router
