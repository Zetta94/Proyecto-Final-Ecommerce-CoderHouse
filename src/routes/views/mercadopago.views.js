import {Router} from "express"
const router = Router()
import dotenv from 'dotenv'
dotenv.config()

const key = process.env.MP_KEY;


router.get('/', (req, res) => {
    res.render('mercadopago',{mp_key : key});
})

export default router