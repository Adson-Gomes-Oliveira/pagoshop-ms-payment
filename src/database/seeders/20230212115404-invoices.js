/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('invoices', [
      {
        id: Sequelize.literal('DEFAULT'),
        process_hash: 'no_hash',
        name: 'Sarah Araujo',
        cpf: '42942304790',
        payment_id: 1,
        buyer_address: JSON.stringify({
          street: 'Caminho 3, Bairro Cincop',
          number: '166',
          cep: '23799000',
          city: 'Curitiba',
          state: 'PR',
          more_info: 'no_info',
        }),
        products_ordered: JSON.stringify([
          {
            product: 'Samsung Galaxy S23 Plus',
            quantity: 1,
            price: 1999.99,
          },
        ]),
      },
      {
        id: Sequelize.literal('DEFAULT'),
        process_hash: 'no_hash',
        name: 'Vitor Santos',
        cpf: '78965412301',
        buyer_address: JSON.stringify({
          street: 'Avenida Macena',
          number: '5887b',
          cep: '45897258',
          city: 'Rio de Janeiro',
          state: 'RJ',
          more_info: 'no_info',
        }),
        products_ordered: JSON.stringify([
          {
            product: 'Samsung Galaxy S23 Plus',
            quantity: 1,
            price: 1999.99,
          },
        ]),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoices', null, {});
  },
};
