const mysql = require('mysql2/promise');
const dbConfig = require('./db.config.js');

// Crear un pool de conexiones para manejar múltiples peticiones
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log(`Conectado a la base de datos: ${dbConfig.DATABASE}`);

module.exports = pool;