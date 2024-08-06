import { Router } from "express"
import { 
        createProduct,
        deleteProduct
 } from "../../controllers/products.controller.js"

 import { isAuthenticated}  from "../../middlewares/auth.js"

const router = Router();
//[POST] 🌐/api/product
router.post("/",isAuthenticated,createProduct)

//[DELETE] 🌐/api/products/:pid
router.delete("/:pid",isAuthenticated,deleteProduct)


// *[PUT] 🌐/api/product/:uid
// router.put('/:uid', async (req, res) => {
//     try {
//         let { uid } = req.params
//         let { title, price, available } = req.body

//         if (!title || !price) {
//             return res.send({ status: "error", error: "Faltan parametros" })
//         }
        
//         let productToUpdate = { title, price, available}
//         let result = await productModel.updateOne({ _id: uid }, productToUpdate)

//         return res.send({ result: "success", payload: productToUpdate  })
//     } catch(error) {
//         console.log(error)
//     } 
// })

// ![DELETE] 🌐/api/product/:uid
// router.delete('/:uid', async (req, res) => {
//     let { uid } = req.params
//     let result = await productModel.deleteOne({ _id: uid })
//     res.send({ result: "success", payload: result })
// })

export default router