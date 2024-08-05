import {Router} from "express"
import {isAuthenticated} from '../../middlewares/auth.js'

const router = Router()

// [GET] 🌐/users/createProduct
router.get('/createProduct',(req,res)=>{
    req.logger.http('Route GET /users/createProduct')
    const { role, premium } = req.session.user
    switch (role) {
        case "admin":
            res.render('createProduct', { user: req.session.user })
            break;
        case "usuario":
            res.render(premium ? 'createProduct' : 'profile', { user: req.session.user })
            break;
        default:
            res.redirect('/profile'); 
            break;
    }
})

router.get('/panelAdmin',isAuthenticated, (req, res) => {
    req.logger.http('Route GET /users/panelAdmin')

    if (req.session && req.session.user) {
        const { role, first_name } = req.session.user

        if (role === "admin") {
            res.render('superUser', { user: req.session.user })
        } else {
            req.logger.warning(`El usuario ${first_name} no es un usuario apto para ingresar al panel de administración`)
            res.render('profile', { user: req.session.user })
        }
    } else {
        req.logger.warning('No hay sesión de usuario disponible.')
        res.redirect('/login')
    }
})

router.get('/usersAdminPanel',isAuthenticated, (req, res) => {
    req.logger.http('Route GET users/usersAdminPanel')
    res.render('superEditUsers',{ user: req.session.user })
})
 


export default router;