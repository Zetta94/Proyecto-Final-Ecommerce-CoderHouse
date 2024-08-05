import { Router } from "express";
import {getCart} from "../../controllers/carts.controller.js"

const router = Router();

// [GET] 🌐/carts/:cid
router.get('/:cid', getCart)

export default router