/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('payments', [
      {
        id: 1,
        value: 366.55,
        buyer_name: 'Fabien Bauelos',
        card_number: '4191466930115450',
        expiration_date: new Date(2027, 11),
        cvv: '852',
        status: Sequelize.literal('DEFAULT'),
        transact_date: Sequelize.literal('DEFAULT'),
      },
      {
        id: 2,
        value: 699.85,
        buyer_name: 'Nwando Cole',
        card_number: '4599456286427755',
        expiration_date: new Date(2029, 12),
        cvv: '194',
        status: Sequelize.literal('DEFAULT'),
        transact_date: Sequelize.literal('DEFAULT'),
      },
    ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {});
  },
};
