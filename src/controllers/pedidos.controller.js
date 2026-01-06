import { pool } from "../db.js";

// Obtener todos los pedidos
export const getPedidos = async (req, res) => {
    try {
    const result = await pool.query("SELECT * FROM Pedidos ORDER BY PedidoID");
    res.json(result.rows);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// Obtener pedido por ID
export const getPedidoById = async (req, res) => {
    try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM Pedidos WHERE PedidoID = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(result.rows[0]);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// Crear pedido
export const createPedido = async (req, res) => {
    try {
    const { clieteid, tipoflor, cantidad, preciototal } = req.body;
    const result = await pool.query(
      "INSERT INTO Pedidos (clienteid, tipoflor, cantidad, preciototal) VALUES ($1, $2, $3, $4) RETURNING *",
        [clieteid, tipoflor, cantidad, preciototal]
    );
    res.status(201).json(result.rows[0]);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// Actualizar pedido
export const updatePedido = async (req, res) => {
    try {
    const { id } = req.params;
    const { ClienteID, TipoFlor, Cantidad, PrecioTotal } = req.body;
    const result = await pool.query(
      "UPDATE Pedidos SET ClienteID=$1, TipoFlor=$2, Cantidad=$3, PrecioTotal=$4 WHERE PedidoID=$5 RETURNING *",
        [ClienteID, TipoFlor, Cantidad, PrecioTotal, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(result.rows[0]);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// Eliminar pedido
export const deletePedido = async (req, res) => {
    try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM Pedidos WHERE PedidoID=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ mensaje: "Pedido eliminado" });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};