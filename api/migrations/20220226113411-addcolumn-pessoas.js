'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pessoas', 'senha',  {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          funcaoValidadora: function(dado) {
            if (dado.length <= 8 || dado.length > 63) throw new Error('O campo senha deve ter 8 ou mais caracteres')
          },
          notEmpty: {
            msg: "O campo senha precisa ser preenchido"
          },
          notNull: {
            msg: "O campo senha precisa ser preenchido"
          }
        }      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pessoas', 'senha');
  }
};