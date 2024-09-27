import { Router } from "express"
import { 
        createProduct,
        deleteProduct
 } from "../../controllers/products.controller.js"

 import { isAuthenticated}  from "../../middlewares/auth.js"

const router = Router();
//[POST] 🌐/api/products
router.post("/",isAuthenticated,createProduct)

//![DELETE] 🌐/api/products/:pid
router.delete("/:pid",isAuthenticated,deleteProduct)




export default router