const express = require("express");
const cors = require("cors");
// Importamos el objeto db, que ahora tiene la función .query
const db = require("./db"); 

const app = express();
const PORT = process.env.PORT || 3000; 
const API_URL = "/api/clientes";

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- 📦 ENDPOINT: POST /api/clientes ---
app.post(API_URL, async (req, res) => {
  const { nombre, apellido, email, telefono } = req.body;

  if (!nombre || !apellido || !email) {
    return res.status(400).send({ message: "Faltan campos requeridos (nombre, apellido, email)." });
  }

  // 💡 CLAVE: Usamos $1, $2, etc. en lugar de ? y añadimos RETURNING id
  const sql = `
    INSERT INTO clientes (nombre, apellido, email, telefono) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, nombre, apellido, email, telefono`; // Pedimos todos los datos de vuelta

  try {
    // 💡 CLAVE: Usamos db.query en lugar de db.execute, y esperamos el objeto 'rows'
    const result = await db.query(sql, [nombre, apellido, email, telefono]);

    // La fila insertada está en result.rows[0]
    const clienteCreado = result.rows[0]; 

    // Respuesta 201 Created
    res.status(201).send(clienteCreado);

  } catch (error) {
    console.error("Error al insertar cliente:", error);
    res.status(500).send({
      message: "Ocurrió un error interno al guardar el cliente.",
      error: error.message
    });
  }
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Node.js (Express) corriendo en el puerto ${PORT}`);
});