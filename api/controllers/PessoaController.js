const { PessoasServices, EmailsServices } = require('../services');
const { AccessToken, TokenOpaco } = require('../models/tokens')
const { EmailVerificacao } = require('../models/email/emails');

const pessoasServices = new PessoasServices();
const accessToken = new AccessToken();
const tokenOpaco = new TokenOpaco();


class PessoaController {

    static async pegaPessoasAtivas(req, res) {
         /* 
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Return all active people'
            #swagger.description = 'catch all active people'
            #swagger.responses[200] = {
                description: 'User successfully obtained.',
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/definitions/TodasPessoasCriadas'
                        }
                    }           
                }
            }
         */
        try {
            const todasAsPessoas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(todasAsPessoas);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        /* 
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Return All people'
            #swagger.description = 'Catch all people'
            #swagger.responses[200] = {
                description: 'User successfully obtained.',
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/definitions/TodasPessoasCriadas'
                        }
                    }           
                }
            }
         */
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res) {
        /* 
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Return one person'
            #swagger.description = 'catch one person'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = {
                description: 'User successfully obtained.',
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/definitions/PessoaCriada'
                        }
                    }           
                }
            }
         */
        const { id } = req.params;
        try{
            const umaPessoa = await pessoasServices.pegaUmRegistro({ id });
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(404).json(error.message);
        }
    }

    static async login(req, res) {
        /**
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Log into the system with credentials'
            #swagger.description = 'Log into the system with credentials'
            #swagger.requestBody = {
                required: true,
                "@content": {
                    "application/json": {
                        schema: {
                            $ref: "#/definitions/Login"
                        }  
                    }
                }
            }
            #swagger.responses[200] = {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/definitions/Refresh'
                        }
                    }           
                }
            }  
         */
        try {
            const acessToken = accessToken.criaTokenJWT(req.user.id);
            const refreshToken = await tokenOpaco.criaTokenOpaco(req.user.id);
            res.set('Authorization', acessToken);
            return res.status(200).json({ refreshToken });
        } catch(erro) {
            return res.status(500).json({erro: erro.message});
        }
    }

    static async logout(req, res) {
        /**
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Log out the system with credentials'
            #swagger.description = 'Log out the system with credentials'
            #swagger.security = [{
                "bearerAuth": []
            }]
         */
        try {
            const token = req.token;
            await accessToken.invalidaTokenJWT(token);
            res.status(204).send();
        } catch (erro) {
            res.status(500).json({erro: erro.message});
        }
    }

    static async verificaEmail(req, res) {
        const { id } = req.params;
        try {
            const pessoa = req.user
            await pessoasServices.modificaEmailVerificado(Number(id));
            return res.status(200).json();
        } catch(erro) {
            return res.status(500).json({erro: erro.message});
        }
    }

    static async criaPessoa(req, res) {
        /**
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Create a person'
            #swagger.description = 'Create a person'
            #swagger.parameters['obj'] = { 
                in: 'body',
                description: 'Informa????es do usu??rio',
                schema: { $ref: "#/definitions/Pessoa" }
            }
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/definitions/Pessoa"
                        }  
                    }
                }
            } 
            #swagger.responses[201] = {
                description: "Person created",
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/definitions/PessoaCriada'
                        }
                    }           
                }
            }  
         */
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
            const endereco = EmailsServices.geraEndereco('/pessoas/verfica_email/', novaPessoaCriada.id);
            const emailVerificacao = new EmailVerificacao(novaPessoaCriada, endereco);
            emailVerificacao.enviaEmail().catch(console.log);
            return res.status(201).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async atualizaPessoa(req, res) {
         /**
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Updated datas of Person'
            #swagger.description = 'Updated datas of Person'
            #swagger.security = [{
                "bearerAuth": []
            }]
         */
        const { id } = req.params;
        const novasInfos = req.bod;
        try {
            await pessoasServices.atualizaRegistro(novasInfos, Number(id));
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro({ id });
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async apagaPessoa(req, res) {
         /**
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Delete a Person'
            #swagger.description = 'Delete a Person'
            #swagger.security = [{
                "bearerAuth": []
            }]
            #swagger.responses[200] = {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            message: 'id ${id} deletado'
                        }
                    }           
                }
            } 
         */
        const { id } = req.params;
        try {
            await pessoasServices.apagaRegistro(Number(id));
            res.status(200).json({ mensagem: `id ${id} deletado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
         /**
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Restoure datas of Person'
            #swagger.description = 'Restoure datas of Person'
            #swagger.security = [{
                "bearerAuth": []
            }]
         */
        const { id } = req.params;
        try {
            await pessoasServices.restauraRegistro(Number(id));
            return res.status(200).json({ mensagem: `id ${id} restaurado`});
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    
    static async cancelaPessoa(req, res) {
         /**
            #swagger.tags = ['Pessoas']
            #swagger.summary = 'Cancel enrollment of a Person'
            #swagger.description = 'cancel enrollment of a Person'
         */
        const { estudanteId } = req.params;
        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));
            return res.status(200).json({ message: `matr??culas ref. estudante ${estudanteId} canceladas` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;