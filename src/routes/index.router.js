import { Router } from "express"
const router = Router()
//Middlewares

//Routes
import cartsRouter from "./api/carts.api.js"
import cartsView from "./views/carts.view.js"
import productsRouter from "./api/products.api.js"
import productsView from "./views/products.view.js"
import usersRouter from "./api/users.api.js"
import usersView from "./views/users.view.js"
import sessionsRouter from "./api/sessions.api.js"
import sessionsView from "./views/session.view.js"
import ticketRouter from "./api/tickets.api.js"
import mercadoPagoRouter from "./views/mercadopago.views.js"
import mercadoPagoRouterApi from "./api/mercadopago.api.js"

// ## API
router.use('/api/sessions',sessionsRouter)
router.use('/api/carts',cartsRouter)
router.use('/api/products',productsRouter)
router.use('/api/users',usersRouter)
router.use('/ticket',ticketRouter)
router.use('/api/mercadopago',mercadoPagoRouterApi)

// ## VIEWS
router.use('/carts',cartsView)
router.use('/products',productsView)
router.use('/',sessionsView)
router.use('/users',usersView)
router.use('/mercadopago',mercadoPagoRouter)

router.use('/',(req,res)=>{
    res.redirect('/login')
})


router.get('/loggerTest', (req, res) => {
    req.logger.debug('Test - DEBUG')
    req.logger.http('Test - HTTP')
    req.logger.info('Test - INFO')
    req.logger.warning('Test - WARNING')
    req.logger.error('Test - ERROR')
    req.logger.fatal('Test - FATAL')
    res.send({ status: 200, message: 'Logger test' })
})

export default router