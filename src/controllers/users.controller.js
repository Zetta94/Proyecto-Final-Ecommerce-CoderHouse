import utils from '../utils.js'
import UsersManager from "../dao/classes/user.dao.js"
import SessionManager from "../dao/classes/session.dao.js"

const manager = new UsersManager()
const managerSession = new SessionManager()

const {isValidPassword,createHash} = utils

export const changePremium = async (req,res)=>{
    req.logger.http('Route POST /api/users/premium/:uid')
    try {
        const {uid} = req.params
        const {premium} = req.body 
        const result = await manager.changeStatus(uid,premium)
        res.status(200).json({ status: "success" })
    } catch (error) {
        req.logger.error("No se pudo cambiar el tipo de usuario")
        res.status(404).json({ 'error': 'User status without changes' })
    }
}

export const getUsersApi = async (req, res) => {
    req.logger.info('Route GET /api/users')
    try {
        const users = await manager.getAll()
        const usersFormatted = users.map(user => {
            const { password, ...rest } = user._doc
            return rest
        })
        res.status(200).json({ status: "success", payload: usersFormatted })
    } catch (error) {
        req.logger.error("No se encontraron usuarios")
        res.status(404).json({ error: 'Users not found' })
    }
}


export const getUsers = async (req,res)=>{
    req.logger.http('Route GET /users/usersAdminPanel')
    try {
        const users = await manager.getAll()
        res.render('superEditUsers',{users})
    } catch (error) {
        req.logger.error("No se encontraron usuarios")
        res.status(404).json({ 'error': 'Users not found' })
    }
}

export const resetPass = async (req, res) => {
    req.logger.http('Route POST: /api/restPass')
    const { email, newPassword } = req.body
    try {
        const updatedPass = await managerSession.restorePassword(email, newPassword)
        req.logger.info("Nueva password generada")
        res.status(200).send({ message: "Contraseña actualizada exitosamente, redirigiendo..." })
    } catch (error) {
        req.logger.warning(error.message)
        if (error.message === "Usuario no encontrado") {
            res.status(401).send({ message: "El mail no coincide con ningún mail en uso" })
        } else if (error.message === "La nueva contraseña y la anterior no deben coincidir") {
            res.status(403).send({ message: "Error: La contraseña nueva debe ser distinta a la anterior" })
        } else {
            res.status(500).send({ message: "Error al actualizar la contraseña" })
        }
    }
}

export const addFile = async (req, res) => {
    req.logger.http('Route POST /api/users/:uid/documents')
    try {
        const { uid } = req.params
        if (!req.files || req.files.length === 0) {
            return res.status(403).json({ status: "error", error: "No files uploaded" })
        }
        const uploadedDocuments = req.files.map(file => ({
            name: file.originalname,
            reference: file.path,
        }))
        const result = await manager.addDocuments(uid, uploadedDocuments)

        res.status(200).json({ status: "success" })
    } catch (error) {
        req.logger.error("No se agregaron documentos")
        res.status(500).json({ error: 'Documents not added' })
    }
}

export const deleteFile = async (req, res) => {
    const { uid, did } = req.params
    try {
        const result = await manager.deleteDocument(uid, did)
        res.status(result.status).json({ message: result.message })

    } catch (error) {
        console.error('Error al eliminar el documento:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const deleteUser = async(req, res) => {
    const { uid } = req.params
    try {
        const result = await manager.deleteAUser(uid)
        res.status(result.status).json({ message: result.message })
    } catch (error) {
        console.error('Error al eliminar un usuario', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}
