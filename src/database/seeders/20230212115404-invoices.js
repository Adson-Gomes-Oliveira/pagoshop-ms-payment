/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('invoices', [
      {
        id: Sequelize.literal('DEFAULT'),
        name: 'Sarah Araujo',
        cpf: '42942304790',
        payment_id: 1,
        description: JSON.stringify({
          buyerAddress: {
            street: 'Caminho 3, Bairro Cincop',
            number: '166',
            cep: '23799000',
            city: 'Curitiba',
            state: 'PR',
          },
          orderList: [
            {
              product: 'Samsung Galaxy S23 Plus',
              quantity: 1,
              price: 1999.99,
            },
          ],
        }),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoices', null, {});
  },
};
