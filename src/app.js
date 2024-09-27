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
//Swagger
import swaggerJsDoc from 'swagger-jsdoc'
import SwaggerUiExpress from 'swagger-ui-express'
//MongoStore
import MongoStore from 'connect-mongo'
//Cors
import cors from "cors"
//Mongoose
import mongoose from './configs/database.js'
//Rutas
import router from "./routes/index.router.js"
//Logger
import { addLogger } from './logger.js'
//Passport
import passport from 'passport'
import initializePassport from './configs/passport.config.js'
//Mercadopago
import MercadoPagoConfig from 'mercadopago'
//dotenv
import dotenv from 'dotenv'
dotenv.config()

const app = express()


//Cors
app.use(cors())

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


//Inicializo Swagger
const swaggerOptions = {
    definition:{
        openapi: "3.0.1",
        info:{
            title: "Documentation",
            description: "API Ecommerce"
        },
    },
    apis: [`src/docs/**/*.yaml`]
}
const specs = swaggerJsDoc(swaggerOptions)
app.use("/apidocs",SwaggerUiExpress.serve,SwaggerUiExpress.setup(specs))

//Rutas
app.use(router)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app