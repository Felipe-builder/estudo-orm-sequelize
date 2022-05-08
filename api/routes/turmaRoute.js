const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')
const passport = require('passport');

const router = Router()

router
    .get('/turmas', TurmaController.pegaTodasAsTurmas)
    .get('/turmas/:id', TurmaController.pegaUmaTurma)
    .post('/turmas/', TurmaController.criaUmaTurma)
    .put('/turmas/:id', passport.authenticate('bearer', {session: false}), TurmaController.atualizaTurma)
    .delete('/turmas/:id', passport.authenticate('bearer', {session: false}), TurmaController.apagaTurma)
    .post('/turmas/:id/restaura', passport.authenticate('bearer', {session: false}),TurmaController.restauraTurma)

module.exports = router