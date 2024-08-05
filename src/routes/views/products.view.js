import { Router } from "express";
import {
    getAProduct,
    getProducts
} from "../../controllers/products.controller.js"
import { isAuthenticated}  from "../../middlewares/auth.js"

const router = Router();

// [GET] 🌐/product/:pid
router.get("/:pid", getAProduct)

// [GET] 🌐/product
router.get('/',isAuthenticated, getProducts)

export default router