const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,       // Obliga a usar SSL
        rejectUnauthorized: false // Permite certificados autogenerados
      }
    },
    logging: false
  }
);

module.exports = sequelize;
