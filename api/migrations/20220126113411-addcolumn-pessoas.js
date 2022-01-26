'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pessoas', 'nomeUser',  {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          funcaoValidadora: function(dado) {
            if (dado.length < 3 || dado.length > 20) throw new Error('O campo nomeUser deve ter mais de 3 caracteres')
          }
        }      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pessoas', 'nomeUser');
  }
};