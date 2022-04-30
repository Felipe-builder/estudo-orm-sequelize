const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
    .get('/pessoas', PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
    .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
    .post('/pessoas', PessoaController.criaPessoa)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)
    .delete('/pessoas/:id', PessoaController.apagaPessoa)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaUmaMatricula)
    .post('/pessoas/:estudanteId/matriculas', PessoaController.criaMatricula)
    .put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
    .delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.apagaMatricula)
    .post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', PessoaController.restauraMatricula)
    .get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculas)
    .get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
    .get('/pessoas/matriculas/lotadas', PessoaController.pegaTurmasLotadas)
    .post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

module.exports = router
