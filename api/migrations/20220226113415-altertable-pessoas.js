'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pessoas', 'nome', {
      type: Sequelize.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if (dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')
        },
        notEmpty: {
          msg: 'O campo nome precisa ser preenchido'
        },
        notNull: {
          msg: 'O campo nome precisa ser preenchido'
        }
      }
    });
  },
    
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pessoas', 'nome', {
      type: Sequelize.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if (dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')
        }
      }
    });
  }

}