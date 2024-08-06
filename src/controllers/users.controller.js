import MODEL_USER from "../dao/models/user.model.js"
import utils from '../utils.js'
import UsersManager from "../dao/classes/user.dao.js"

const manager = new UsersManager()

const {isValidPassword,createHash} = utils

//Editar y modularizar bien esto porque esta mal utilizado el controlador en UserManager.
export default class UserManager{
    async restorePassword(email, newPassword) {
        const user = await MODEL_USER.findOne({ email }, { email: 1, password: 1 });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
    
        if (isValidPassword(user, newPassword)) {
            throw new Error("La nueva contraseña y la anterior no deben coincidir");
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
    req.logger.http('Route GET /api/users/premium/:uid');
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
    req.logger.http('Route GET /users/usersAdminPanel');
    try {
        const users = await manager.getAll()
        res.render('superEditUsers',{users});
    } catch (error) {
        req.logger.error("No se encontraron usuarios")
        res.status(404).json({ 'error': 'Users not found' })
    }
}