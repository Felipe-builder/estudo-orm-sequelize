'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
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
      },
      ativo: {
        type: Sequelize.BOOLEAN
      },
      nomeUser: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          funcaoValidadora: function(dado) {
            if (dado.length < 3 || dado.length > 20) throw new Error('O campo nomeUser deve ter mais de 3 caracteres')
          },
          notEmpty: {
            msg: 'O campo nomeUser precisa ser preenchido'
          },
          notNull: {
            msg: 'O campo nomeUser precisa ser preenchido'
          }
        }  
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          funcaoValidadora: function(dado) {
            if (dado.length <= 8 || dado.length >= 63) throw new Error('O campo sennha deve ter 8 ou mais caracteres')
          },
          notEmpty: {
            msg: "O campo senha precisa ser preenchido"
          },
          notNull: {
            msg: "O campo senha precisa ser preenchido"
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
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
      },
      role: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pessoas');
  }
};