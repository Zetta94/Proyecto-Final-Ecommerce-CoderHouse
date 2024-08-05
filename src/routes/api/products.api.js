import { Router } from "express";

const router = Router();

// [GET] 🌐/api/product
// router.post('/', async (req, res) => {
//     try{
//         let { title, price, available } = req.body
//         if (!title || !price) {
//             res.send({ status: "error", error: "Faltan parametros" })
//         }
//         let result = await productModel.create({ title, price, available })
//         res.send({ result: "success", payload: result })
//     }catch(error){
//         console.log(error)
//     }
// })


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