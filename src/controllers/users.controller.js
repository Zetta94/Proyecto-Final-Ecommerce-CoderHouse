import MODEL_USER from "../dao/models/user.model.js"
import utils from '../utils.js'

const {isValidPassword,createHash} = utils

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