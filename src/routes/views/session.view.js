import { Router } from 'express'
import { isAuthenticated, isNotAuthenticated } from '../../middlewares/auth.js'

const router = Router()

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login')
})

router.get('/register', isNotAuthenticated, (req, res) => {
    req.logger.http('Route GET /register')
    res.render('register')
})

router.get('/profile', isAuthenticated, (req, res) => {
    req.logger.info(`${req.user.first_name} ${req.user.last_name} is online`)
    res.render('profile', { user: req.session.user })
})

router.get('/sendTicket',(req,res)=>{
    req.logger.http('Route GET /sendTicket')
    res.render('ticket',{user : req.session.user})
})

router.get('/newPassword',(req,res)=>{
    req.logger.http('Route GET /newPassword')
    res.render('newPassword')
})


export default router