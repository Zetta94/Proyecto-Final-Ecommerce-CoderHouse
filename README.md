# _Ecommerce_ : Proyecto final Coder House Backend 

## Tabla de Contenidos

- [Descripción](#descripción)
- [Alojamiento](#Alojamiento)
- [Instalación y Ejecución](#instalación-y-ejecución)
  - [Backend](#backend)
- [Tecnologías](#Tecnologías)
- [Requerimientos](#Requerimientos)
- [Plus](Plus)
  
## Descripción

Este proyecto es una aplicación web desarrollada en **Javascript** utilizando **Handlebars** como plantillas y **Express** con **MongoDB**. 
La aplicación permite realizar operaciones CRUD sobre una entidad principal, en este caso un ecommerce básico basado en datos consumidos y almacenados en MongoDB. 

### Funcionalidades

- **CRUD Completo:** Permite crear, leer, actualizar y eliminar datos.
- **Interfaz de Usuario:** Desarrollo con Handlebars, CSS, HTML y Bootstrap proporcionando una experiencia de usuario interactiva.
- **Paginación:** Implementada para manejar grandes volúmenes de datos.
- **API de Datos:** Consumo de datos almacenados en MongoDB.

## Alojamiento

| DESARROLLO | URL |
| ------ | ------ |
| Backend | [https://api-prueba-tecnica.onrender.com](https://proyecto-final-ecommerce-coderhouse.onrender.com/login) |

## Instalación y Ejecución

<blockquote>
<strong>Nota:</strong> Solo ejecuta los siguientes pasos si quieres ejecutar el proyecto de forma local
</blockquote>

### Backend

1. **Clona el repositorio**

   ```sh
   git init
   git clone https://github.com/Zetta94/Proyecto-Final-Ecommerce-CoderHouse
   ```

2. **Instala las dependencias necesarias**
   
   ```bash
   npm install
   ```
   
3. **Crea un archivo .env en la raíz del directorio y configura las siguientes variables de entorno**
   
   ```sh
   # Mongo Server
    MONGODB_URL=<url-mongo>
    SECRET_KEY=<secret-key>
    
    # Superadmin (La brindada en clase)
    ADMIN_EMAIL=<superadmin-email> 
    ADMIN_PASSWORD=<superadmin-password>
    
    # Persistencia
    PERSISTENCE=MONGO
    
    # NODEMAILER
    GMAIL_ACCOUNT=<gmail-cuenta>
    GMAIL_PASSWORD=<gmail-password>
    
    #ENVIRONMENT
    NODE_ENV=DESARROLLO
    URL=<url-local>
    PORT=<puerto-local>
    
    #MERCADOPAGO
    MP_KEY=<mercadopago-key>
    MP_TOKEN=<mercadopago-token>
   ```
   
4. **Inicia el servidor**
   
   ```bash
   npm start
   ```
   
5. **Puedes revisar la documentación de la API ingresando en el siguiente endpoint (Reemplaza PORT y URL por el puerto y url configurado en .env)** 
   ```bash
   <URL>:<PORT>/apidocs
   ```
   
6. **Pruebas**
 
   **Puedes realizar pruebas utilizando <u>Postman</u> para comprobar el funcionamiento de los distintos endpoints**

<br>

<div align="center">
  <h1 style="color: #4CAF50;">🎉 ¡Listo! 🎉 </h1>
  <h2>¡Ya puedes navegar por la web y comprobar sus funcionalidades!</h2>
</div>

## Tecnologías

- * Se utilizaron diversas tecnologias, plataformas y librerias, entre las que destacan las siguientes:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Requerimientos

<div align="center">
  <h1> Requerimientos Backend  </h1>
</div>

### Entidades y CRUD

- **Desarrollo**: Se desarrolló utilizando **NodeJS**, **Javascript**, **MONGODB** y **ExpressJS**
- **Modelos**: Se implementaron los siguientes modelos: 'user','cart','product' y 'ticket'.
- **Operaciones CRUD**: Se realiza un CRUD para cada uno de los modelos que involucra diversos endpoints.
- **Almacenamiento**:  Se almacena en la base de datos de MONGODB la información resultado de la creación de nuevos elementos.

### Consumo de API

- **Servicio Backend**: Se realizó un servicio en el backend que consume y almacena datos en MongoDB.
- **Sincronización**: Se permite la sincronización de datos desde la API externa a la base de datos.

### Plus

- **Autenticación**: Se implemento ` passport ` para manejar la autenticación de los usuarios.
- **Autorización**: Se diseño un middleware para poder controlar la autorización al momento de realizar las distintas funcionalidades.
- **Seguridad**: Se utilizó ` bycript-js ` para manejar de forma segura las contraseñas de los usuarios, y se utilizó ` .env ` para proteger las variables de entorno.
- **Documentación**: Se documentaron las rutas de la API utilizando ` Swagger `.
- **Paginación**: Se implemento una paginación en la aplicación.
- **Despliegue**: Se implemento el despliegue de la aplicación.
- **Estilos**: Se utilizó **Handlebars**,**CSS**,**HTML** y **Bootstrap** para el estilizado de la aplicación.
- **Filtrado**: Se añadió un sistema de filtrado para mejorar la navegación y accesibilidad de los datos.
- **Notificaciones**: Se implemento ` Nodemailer ` para enviar mails a los usuarios en caso de cambios en su rol o productos.
- **Mercadopago**: Se implemento ` Mercadopago API ` para realizar un pago de un solo producto a través de la ruta https://proyecto-final-ecommerce-coderhouse.onrender.com/mercadopago.
- **Almacenamiento de nuevos datos**: Se implemento ` Multer ` para poder subir imagenes y archivos para que cada usuario pueda cargar sus datos.
- **Test**: Se imeplemento ` Supertest ` y ` Chai ` para poder generar test sobre algunas rutas.
