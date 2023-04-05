module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_DATABASE || 'ms-payment',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3308',
    dialect: process.env.DB_DIALECT || 'mysql',
  },
  test: {
    username: 'root',
    password: 'secret',
    database: 'ms-payment-test',
    host: '127.0.0.1',
    port: '3309',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'null',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
