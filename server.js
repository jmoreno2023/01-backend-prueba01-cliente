const express = require("express");
const cors = require("cors");
const db = require("./db"); // Importamos el pool de la DB

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "/api/clientes";

// Middleware
// 1. CORS: Permite que tu frontend de Angular (ej. localhost:4200) acceda a esta API.
app.use(cors());

// 2. Body Parser: Permite que Express lea el JSON enviado por el frontend.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- 📦 ENDPOINT: POST /api/clientes ---
app.post(API_URL, async (req, res) => {
  const { nombre, apellido, email, telefono } = req.body;

  // 1. Validación simple de datos
  if (!nombre || !apellido || !email) {
    return res.status(400).send({ message: "Faltan campos requeridos (nombre, apellido, email)." });
  }

  // 2. Consulta SQL para insertar el nuevo cliente
  const sql = `INSERT INTO clientes (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)`;

  try {
    // Ejecutamos la consulta usando el pool de conexiones
    const [result] = await db.execute(sql, [nombre, apellido, email, telefono]);

    // 3. Respuesta exitosa (Código HTTP 201 Created)
    const clienteCreado = {
      id: result.insertId, // ID generado por MySQL
      nombre,
      apellido,
      email,
      telefono
    };

    res.status(201).send(clienteCreado);

  } catch (error) {
    // 4. Manejo de errores de base de datos
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
  console.log(`El endpoint para crear clientes es: /api/clientes`);
});