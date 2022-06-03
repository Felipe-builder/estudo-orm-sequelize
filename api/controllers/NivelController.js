const database = require('../models')

const { NiveisServices }= require('../services')
const niveisServices = new NiveisServices()

class NivelController {
    static async pegaTodosOsNiveis(req, res){
        /**
            #swagger.tags = ['Niveis']
         */
        try {
            const todosOsNiveis = await niveisServices.pegaTodosOsRegistros()
            res.status(200).json(todosOsNiveis)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmNivel(req, res) {
        /**
            #swagger.tags = ['Niveis']
         */
        const { id } = req.params
        try {
            const umNivel = await niveisServices.pegaUmRegistro({ id })
            return res.status(200).json(umNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaNivel(req, res) {
        /**
            #swagger.tags = ['Niveis']
         */
        const novoNivel = req.body
        try {
            const novoNivelCriado = await niveisServices.criaRegistro(novoNivel)
            return res.status(200).json(novoNivelCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaNivel(req, res) {
        /**
            #swagger.tags = ['Niveis']
         */
        const { id } = req.params
        const novasInfo = req.body
        try {
            await niveisServices.atualizaRegistro(novasInfo, Number(id))
            const nivelAtualizado = await niveisServices.pegaUmRegistro({id})
            return res.status(200).json(nivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaNivel(req, res) {
        /**
            #swagger.tags = ['Niveis']
         */
        const { id } = req.params
        try {
            await niveisServices.apagaRegistro(Number(id))
            return res.status(200).json({mensagem: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraNivel(req, res) {
        /**
            #swagger.tags = ['Niveis']
         */
        const { id } = req.params
        try {
            await niveisServices.restauraRegistro(Number(id))
            return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController