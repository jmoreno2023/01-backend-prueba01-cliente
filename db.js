// Usamos el módulo 'pg' que es el cliente estándar de PostgreSQL para Node.js
const { Pool } = require('pg');

// Render proporciona una única variable de entorno llamada DATABASE_URL
// que contiene todas las credenciales necesarias (usuario, password, host, puerto, nombre de la DB).
// Esta es la forma más limpia de conectarse en Render.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ Error: La variable de entorno DATABASE_URL no está definida.");
    // Esto detendrá la aplicación si DATABASE_URL no existe (útil en Render)
    throw new Error("DATABASE_URL no definida. La conexión a la DB falló.");
}

// Crear un pool de conexiones para PostgreSQL
const pool = new Pool({
  connectionString: connectionString,
  // Opcional: Configuración para Render si usas SSL (recomendado)
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('✅ Pool de conexiones de PostgreSQL creado y conectado.');
});

// Exportar el pool y un método simplificado para ejecutar consultas
module.exports = {
  // Función 'query' simplificada para usar en server.js
  query: (text, params) => pool.query(text, params),
  // Nota: En PostgreSQL, la función que usaremos para insertar se llama 'query'
};