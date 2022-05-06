'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Pessoas', [
        {
          nome: 'Ana Souza',
          ativo: true,
          nomeUser: 'ana-souza',
          senha: 'oi10234123',
          email: 'ana@ana.com',
          role: 'estudante',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Marcos Cintra',
          ativo: true,
          nomeUser: 'marcos-cintra',
          senha: 'senhaboa12312',
          email: 'marcos@marcos.com',
          role: 'estudante',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Felipe Cardoso',
          ativo: true,
          nomeUser: 'cardoso.Felipe',
          senha: 'senhaboa12312',
          email: 'felipe@felipe.com',
          role: 'estudante',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Sandra Gomes',
          ativo: false,
          nomeUser: 'sandra.go',
          senha: 'senhaboa12312',
          email: 'sandra@sandra.com',
          role: 'estudante',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Paula Morais',
          ativo: true,
          nomeUser: 'paulinha',
          senha: 'senhaboa12312',
          email: 'paula@paula.com',
          role: 'docente',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Sergio Lopes',
          ativo: true,
          nomeUser: 'segios2',
          senha: 'senhaboa12312',
          email: 'sergio@sergio.com',
          role: 'docente',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
