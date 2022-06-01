const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();
// const Token  = require('../utils/Token');
const blocklist = require('../../redis/blocklist-access-token');
const { AccessToken, TokenOpaco } = require('../models/tokens')
const accessToken = new AccessToken();
const tokenOpaco = new TokenOpaco();


class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(todasAsPessoas)
        }catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        }catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        try{
            console.log(id)
            const umaPessoa = await pessoasServices.pegaUmRegistro({ id })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(404).json(error.message)
        }
    }

    static async login(req, res) {
        try {
            const acessToken = accessToken.criaTokenJWT(req.user.id);
            const refreshToken = await tokenOpaco.criaTokenOpaco(req.user.id);
            res.set('Authorization', acessToken);
            res.status(200).send({ refreshToken });
        } catch(erro) {
            res.status(500).json({erro: erro.message})
        }
    }

    static async logout(req, res) {
        try {
            const token = req.token;
            await blocklist.adiciona(token);
            res.status(204).send()
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaPessoa(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await pessoasServices.atualizaRegistro(novasInfos, Number(id))
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro({ id })
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.apagaRegistro(Number(id))
            res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.restauraRegistro(Number(id))
            return res.status(200).json({ mensagem: `id ${id} restaurado`})
        }catch(error) {
            return res.status(500).json(error.message)
        }
    }

    
    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params
        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({ message: `matrículas ref. estudante ${estudanteId} canceladas` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController