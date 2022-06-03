'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado'},
        as: 'aulasMatriculadas'
      })
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
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
    ativo: DataTypes.BOOLEAN,
    nomeUser: {
      type: DataTypes.STRING,
      unique: {
        name: 'nomeUser',
        msg: 'Este usuário já está em uso'
      },
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        funcaoValidadora: function(dado) {
          if (dado.length <= 8 || dado.length >= 200) throw new Error('O campo sennha deve ter 8 ou mais caracteres')
        },
        notEmpty: {
          msg: "O campo senha precisa ser preenchido"
        },
        notNull: {
          msg: "O campo senha precisa ser preenchido"
        }
      },
      set(valor) {
        let senha = valor.toString()
        const hash = bcrypt.hashSync(senha, 12)
        this.setDataValue('senha', hash)
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'Este email já está em uso'
      },
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
    role: DataTypes.STRING,
    emailVerificado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      todos: {
        where: {}
      }
    }
  });
  return Pessoas;
};