/* eslint-disable no-shadow */
// Validar credit card
const Payments = (sequelize, DataTypes) => {
  const Payments = sequelize.define('Payments', {
    value: DataTypes.DECIMAL(10, 2),
    buyerName: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    expirationDate: DataTypes.DATE,
    cvv: DataTypes.STRING,
    status: DataTypes.STRING,
    transactDate: DataTypes.DATE,
  }, {
    underscored: true,
    tableName: 'payments',
    timestamps: false,
  });

  Payments.associate = (models) => {
    Payments.hasOne(models.Invoices, {
      as: 'invoices',
      foreignKey: 'payment_id',
    });
  };

  return Payments;
};

module.exports = Payments;
