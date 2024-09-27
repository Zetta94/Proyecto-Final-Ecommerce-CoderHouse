import {Router} from "express"
import { MercadoPagoConfig, Preference } from "mercadopago"
import dotenv from 'dotenv'
dotenv.config()

const router = Router()
const client = new MercadoPagoConfig({accessToken: process.env.MP_TOKEN})

router.post('/', async (req, res) => {
    try{
        const body ={
            items: [
                {
                    title:req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id:"ARS"
                }
            ],
            back_urls:{
                success:"https://www.tycsports.com",
                failure:"https://www.ole.com.ar",
                pending:"https://www.marca.com"
            },
            auto_return: "approved",
        }

        const preference = new Preference(client)
        const result = await preference.create({body})

        res.json({
            id:result.id
        })

    }catch(error){
        console.log("Error: ",error)
        res.status(500).json({message: "Error to create preference"})
    }
})

export default router