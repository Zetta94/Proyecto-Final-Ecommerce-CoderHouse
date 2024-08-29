import { Router } from "express";
import {
    getProductofCart,
    cartAmount,
    addNewCart,
    addProduct,
    updateProductsOfCart,
    updateQuantity,
    removeProduct,
    removeAll,
    deleteCart,
    createACart
} from "../../controllers/carts.controller.js"

const router = Router();


// [GET] 🌐/api/carts/:cid
router.get('/:cid', getProductofCart )

// [GET] 🌐/api/carts/:cid/total
router.get('/:cid/total', cartAmount)

// ?[POST] 🌐/api/carts/new carro verdadero 66b0233f22776e892fd8e8ce
router.post('/',createACart)

//! RUTA CON ERROR, ARREGLAR
// ?[POST] 🌐/api/carts/new
router.post('/new/:uid', addNewCart)

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

//![DELETE] /api/carts/delete/:cid
router.delete('/delete/:cid',deleteCart)
//66abdd7c3c256c2f0061cae0
//66b02290e2d128cb072de5d4
//66b0233f22776e892fd8e8cc

export default router