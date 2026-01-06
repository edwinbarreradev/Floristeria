import { Router } from "express";
import {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
} from "../controllers/pedidos.controller.js";

const router = Router();

router.get("/", getPedidos);
router.get("/:id", getPedidoById);
router.post("/", createPedido);
router.put("/:id", updatePedido);
router.delete("/:id", deletePedido);

export default router;