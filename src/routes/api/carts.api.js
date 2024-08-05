import { Router } from "express";
import {
    getProductofCart,
    cartAmount,
    addNewCart,
    addProduct,
    updateProductsOfCart,
    updateQuantity,
    removeProduct,
    removeAll
} from "../../controllers/carts.controller.js"

const router = Router();


// [GET] 🌐/api/carts/:cid
router.get('/:cid', getProductofCart )

// [GET] 🌐/api/carts/:cid/total
router.get('/:cid/total', cartAmount)

// ?[POST] 🌐
router.get('/', addNewCart)

// ?[POST] 🌐/api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', addProduct)

// *[PUT] 🌐/api/carts/:cid
router.put('/:cid', updateProductsOfCart)

// *[PUT] 🌐/api/carts/:cid/product/:pid
router.put('/:cid/product/:pid', updateQuantity)

// ![DELETE] 🌐/api/carts/:cid/product/:pid
router.delete('/:cid/product/:pid', removeProduct)

// ![DELETE] 🌐/api/carts/:cid
router.delete('/:cid', removeAll)

export default router