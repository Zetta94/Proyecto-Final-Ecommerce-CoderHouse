import MODEL_USER from "../dao/models/user.model.js"
import utils from '../utils.js'
import UsersManager from "../dao/classes/user.dao.js"

const manager = new UsersManager()

const {isValidPassword,createHash} = utils

//Editar y modularizar bien esto porque esta mal utilizado el controlador en UserManager.
export default class UserManager{
    async restorePassword(email, newPassword) {
        const user = await MODEL_USER.findOne({ email }, { email: 1, password: 1 })
        if (!user) {
            throw new Error("Usuario no encontrado")
        }
    
        if (isValidPassword(user, newPassword)) {
            throw new Error("La nueva contraseña y la anterior no deben coincidir")
        }

        let newPass = createHash(newPassword)
        const result  = await MODEL_USER.findOneAndUpdate(
            { email: email },
            { $set: { password: newPass } },
            { new: true }
        )
    
        return { code: 200, status: `Contraseña restaurada correctamente` }
    }

}

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
        const updatedPass = await manager.restorePassword(email, newPassword)
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
    const { uid, did } = req.params;
    try {
        const result = await manager.deleteDocument(uid, did);
        res.status(result.status).json({ message: result.message });

    } catch (error) {
        console.error('Error al eliminar el documento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};