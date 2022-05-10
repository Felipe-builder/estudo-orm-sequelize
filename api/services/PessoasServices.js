const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}) {
        return database[this.nomeDoModelo].findAll({ where: { ...where }})
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo]
            .scope('todos')
            .findAll({ where: { ...where }})
    }

    async pegaUmRegistro(where = {}) {
        return database[this.nomeDoModelo]
            .scope('todos')
            .findOne({where: { ...where}})
    }


    async atualizaRegistro(dadosAtualizados, id, transacao = {}){
        return database[this.nomeDoModelo]
            .scope('todos')
            .update(dadosAtualizados, {
                where: { id: id}
            })
    }

    async apagaRegistro(id) {
        return database[this.nomeDoModelo]
            .scope('todos')
            .destroy({ where: { id: Number(id) }})
    }

    async restauraRegistro(id) {
        return database[this.nomeDoModelo]
        .scope('todos')
        .restore({
            where: {
                id: id
            }
        })
    }

    /**
     * Método que cancela a matricula dos alunos, alterando primeiramente o atributo "ativo": true para "ativo": false.
     * Após alteração devida da coluna 'ativo' ocorree a alteração da coluna de "status" para "status": "cancelado"
     * @param {*} estudanteId 
     * @returns 
     */
    async cancelaPessoaEMatriculas(estudanteId) {
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro(
                { ativo: false }, estudanteId, { transaction: transacao }
            )
            
            await this.matriculas.atualizaRegistros(
                { status: 'cancelado' }, { estudante_id: estudanteId}, { transaction: transacao }
            )
        })
    }
}

module.exports = PessoasServices