/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.FLOAT,
      },
      buyerName: {
        type: Sequelize.STRING,
        field: 'buyer_name',
      },
      cardNumber: {
        type: Sequelize.BIGINT,
        field: 'card_number',
      },
      expirationDate: {
        type: Sequelize.DATE,
        field: 'expiration_date',
      },
      cvv: {
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'CREATED',
      },
      transactDate: {
        type: Sequelize.DATE,
        field: 'transact_date',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  },
};
