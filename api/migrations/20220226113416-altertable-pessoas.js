'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pessoas', 'email', {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo e-mail inválido'
        },
        notEmpty: {
          msg: 'O campo email precisa ser preenchido'
        },
        notNull: {
          msg: 'O campo email precisa ser preenchido'
        }
      }
    });
  },
    
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pessoas', 'email', {
      type: Sequelize.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo e-mail inválido'
        },
        notEmpty: {
          msg: 'O campo email precisa ser preenchido'
        },
        notNull: {
          msg: 'O campo email precisa ser preenchido'
        }
      }
    });
  }

}