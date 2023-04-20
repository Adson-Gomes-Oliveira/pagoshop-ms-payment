/* eslint-disable no-shadow */
const Invoices = (sequelize, DataTypes) => {
  const Invoices = sequelize.define('Invoices', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    buyerAddress: DataTypes.JSON,
    productsOrdered: DataTypes.JSON,
    paymentId: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'invoices',
    updatedAt: false,
  });

  Invoices.associate = (models) => {
    Invoices.belongsTo(models.Payments, {
      as: 'payments',
      foreignKey: 'paymentId',
    });
  };

  return Invoices;
};

module.exports = Invoices;
