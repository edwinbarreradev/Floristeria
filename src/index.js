import express from "express";
import clientesRoutes from "./routes/clientes.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
// Rutas
app.use("/api/clientes", clientesRoutes);
app.use("/api/pedidos", pedidosRoutes);

// Arrancar servidor
const PORT = 4000;
app.listen(PORT, () => {
console.log(`Servidor escuchando en http://127.0.0.1:${PORT}`);
});