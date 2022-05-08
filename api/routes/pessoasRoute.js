const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const MatriculaController = require('../controllers/MatriculaController')

const passport = require('passport')

const router = Router()

router
    .post('/pessoas/login', passport.authenticate('local', { session: false }), PessoaController.login)
    .get('/pessoas', PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
    .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
    .post('/pessoas/email', PessoaController.pegaUmaPessoaPorEmail)
    .post('/pessoas', PessoaController.criaPessoa)
    .put('/pessoas/:id', passport.authenticate('bearer', {session: false}), PessoaController.atualizaPessoa)
    .delete('/pessoas/:id', passport.authenticate('bearer', {session: false}), PessoaController.apagaPessoa)
    .post('/pessoas/:id/restaura', passport.authenticate('bearer', {session: false}), PessoaController.restauraPessoa)
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.pegaUmaMatricula)
    .post('/pessoas/:estudanteId/matriculas', passport.authenticate('bearer', {session: false}), MatriculaController.criaMatricula)
    .put('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.atualizaMatricula)
    .delete('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.apagaMatricula)
    .post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', MatriculaController.restauraMatricula)
    .get('/pessoas/:estudanteId/matriculas', MatriculaController.pegaMatriculas)
    .get('/pessoas/matriculas/:turmaId/confirmadas', MatriculaController.pegaMatriculasPorTurma)
    .get('/pessoas/matriculas/lotadas', MatriculaController.pegaTurmasLotadas)
    .post('/pessoas/:estudanteId/cancela', passport.authenticate('bearer', {session: false}), PessoaController.cancelaPessoa)

module.exports = router
