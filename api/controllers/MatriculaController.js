const Sequelize = require('sequelize')
const { MatriculasServices, PessoasServices } = require('../services')
const matriculasServices = new MatriculasServices()
const pessoasServices = new PessoasServices()

class MatriculaController {
    static async pegaUmaMatricula(req, res) {
        /**
            #swagger.tags = ['Matriculas']
         */
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await matriculasServices
                .pegaUmRegistro({id: Number(matriculaId),estudante_id: Number(estudanteId)})
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async criaMatricula(req, res){
        /**
            #swagger.tags = ['Matriculas']
            #swagger.security = [{
                "bearerAuth": []
            }]            
         */
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        /**
            #swagger.tags = ['Matriculas']
            #swagger.security = [{
                "bearerAuth": []
            }]
         */
        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body
        try {
            await matriculasServices.atualizaRegistros(novasInfos,
                {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            )
            const matriculaAtualizada = await matriculasServices.pegaUmRegistro({ id: Number(matriculaId)})
            return res.status(200).json(matriculaAtualizada)
        }catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req, res) {
        /**
            #swagger.tags = ['Matriculas']
            #swagger.security = [{
                "bearerAuth": []
            }]
         */
        const { matriculaId } = req.params
        try {
            await matriculasServices.apagaRegistro(Number(matriculaId))
            return res.status(200).json({mensagem: `id ${matriculaId} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        } 
    }

    static async restauraMatricula(req, res) {
        /**
            #swagger.tags = ['Matriculas']
            #swagger.security = [{
                "bearerAuth": []
            }]
         */
        const { matriculaId } = req.params
        try {
            await matriculasServices.restauraRegistro(Number(matriculaId))
            return res.status(200).json({mensagem: `id ${matriculaId} restaurado`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculas(req, res) {
        /**
            #swagger.tags = ['Matriculas']
            #swagger.security = [{
                "bearerAuth": []
            }]
         */
        const { estudanteId } = req.params
        try {
            const pessoa = await pessoasServices.pegaUmRegistro({ id: Number(estudanteId)})
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        /**
            #swagger.tags = ['Matriculas']
            #swagger.security = [{
                "bearerAuth": []
            }]
         */
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await matriculasServices
                .encontraEContaRegistros({ turma_id: Number(turmaId), status: 'confirmado' },
                { limit: 20, order: [['estudante_id', 'DESC']]}
            )
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTurmasLotadas(req, res) {
        /**
            #swagger.tags = ['Matriculas']
         */
        const lotacaoTurma = 3
        try {
            const turmasLotadas = await matriculasServices
                .encontraEContaRegistros(
                    { status: 'confirmado' }, 
                    { 
                        attributes: ['turma_id'],
                        group: ['turma_id'], 
                        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                    }
                )
            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = MatriculaController