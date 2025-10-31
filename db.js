const mysql = require('mysql2/promise');
//const dbConfig = require('./db.config.js');

// Crear un pool de conexiones para manejar múltiples peticiones
const pool = mysql.createPool({
  // 💡 CLAVE: Usar variables de entorno de Render
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Mantener las opciones de pool
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log(`Conectado a la base de datos: ${dbConfig.DATABASE}`);

module.exports = pool;