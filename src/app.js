//Express
import express from 'express'
//Session
import session from 'express-session'
import bodyParser from 'body-parser'
//Handlebars
import utils from './utils.js'
const {__dirname} = utils
import handlebars from 'express-handlebars'
import exphbs from 'express-handlebars'
//MongoStore
import MongoStore from 'connect-mongo'
//Mongoose
import mongoose from './configs/database.js'
//Rutas
import router from "./routes/index.router.js"
//Logger
import { addLogger } from './logger.js'
//Passport
import passport from 'passport'
import initializePassport from './configs/passport.config.js'
//dotenv
import dotenv from 'dotenv'
dotenv.config()


//!Arreglar handlebars para que todos los scripts esten en un mismo archivo.
//!Generar la vista para el tipo de usuario superadmin.
//!Generar la ruta para cambiar el rol de un usuario de user a premium y viseversa.
//!Generar ruta para agregar y eliminar un producto.

const app = express()

app.use(addLogger)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exphbs.create().handlebars.registerHelper('ifEquals', function(value1, value2, options) {
    if (value1 === value2) {
        return options.fn(this); 
    } else {
        return options.inverse(this); 
    }
});

const hbs = handlebars.create({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
})

app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
}))


//Inicializo Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(__dirname + '/public'))

//Rutas
app.use(router)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})