import { pool } from "../db.js";

// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Clientes ORDER BY ClienteID");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un cliente por ID
export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM Clientes WHERE ClienteID = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear cliente
export const createCliente = async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ error: "Cuerpo vacío o Content-Type no es application/json" });
    }

    // accept either camelCase or PascalCase keys from clients
    const nombre = body.nombre ?? body.nombre;
    const apellido = body.apellido ?? body.apellido;
    const telefono = body.telefono ?? body.Telefono;
    const correo = body.correo ?? body.correo;

    if (!nombre || !apellido || !telefono || !correo) {
      return res.status(400).json({ error: "Faltan datos en el cuerpo de la petición" });
    }

    const { rows } = await pool.query(
      `INSERT INTO clientes ("nombre", "apellido", "telefono", "correo") 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, apellido, telefono, correo]
    );

    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}



// Actualizar cliente
export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, telefono, correo } = req.body;

    if (!nombre || !apellido || !telefono || !correo) {
      return res.status(400).json({ error: "Faltan datos en el cuerpo de la petición" });
    }

    const result = await pool.query(
      `UPDATE Clientes 
       SET "nombre"=$1, "apellido"=$2, "telefono"=$3, "correo"=$4 
       WHERE "clienteid"=$5 RETURNING *`,
      [nombre, apellido, telefono, correo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar cliente
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM clientes WHERE "clienteid" = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json({ mensaje: "Cliente eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
