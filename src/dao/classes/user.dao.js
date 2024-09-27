import userModel from "../models/user.model.js"
import sendMailTo from "../../configs/notifications/nodemailer.config.js"
import fs from 'fs'

export default class UsersManager{
    async changeStatus(uid,premium){
        try {
            const user = await userModel.findById(uid)
            if (!user) {
                throw new Error('User not found')
            }
            if (!user.documents) {
                throw new Error('User has not uploaded all required documents')
            }
            if (!user.premium && user.documents.length < 3) {
                throw new Error('User has not uploaded all required documents')
            }

            const result = await userModel.updateOne(
                { _id: uid },
                { premium: premium }
            )
            if (result.acknowledged === true) {
                return { code: 200, status: 'User status updated' }
            }
            return { code: 404, status: 'User not found' }
        } catch (error) {
            throw new Error('User has not uploaded all required documents')
        }
    }
    
    async getAll(){
        try {
            const users = await userModel.find({ role: { $ne: 'admin' } })
            return users
        } catch (error) {
            throw new Error('Error retrieving users: ' + error.message)
        }
    }

    async addDocuments(uid,uploadedDocuments){
        try {
            // Encuentra al usuario por ID
            const user = await userModel.findById(uid)
            if (!user) {
                throw new Error('User not found')
            }
    
            // Actualiza los documentos del usuario
            await userModel.findByIdAndUpdate(uid, {
                $push: { documents: { $each: uploadedDocuments } }
            })
    
            return { status: 'success' }
        } catch (error) {
            console.error('Error uploading documents:', error)
            throw error
        }
    }

    async deleteDocument(uid, did) {
        try {
            const user = await userModel.findById(uid)

            if (!user) {
                return { status: 404, message: 'Usuario no encontrado' }
            }

            const documentIndex = user.documents.findIndex(doc => doc._id.toString() === did)

            if (documentIndex === -1) {
                return { status: 404, message: 'Documento no encontrado' }
            }

            // Elimina el archivo físico del servidor
            const filePath = user.documents[documentIndex].reference
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            } else {
                return { status: 404, message: 'Archivo no encontrado' }
            }

            // Elimina el documento del array de documentos del usuario
            user.documents.splice(documentIndex, 1)

            // Guarda los cambios en la base de datos
            await user.save()
            return { status: 200, message: 'Documento eliminado exitosamente' }

        } catch (error) {
            console.error('Error al eliminar el documento:', error)
            return { status: 500, message: 'Error interno del servidor' }
        }
    }

    async deleteAUser(uid) {
        try {
            const user = await userModel.findById(uid);
            if (!user) {
                return { status: 404, message: 'User not found' };
            }
            const mailUser = user.email
            const now = new Date();
            const lastConnection = new Date(user.last_connection);
            const twoDays = 2 * 24 * 60 * 60 * 1000; 
    
            if (now - lastConnection > twoDays) {
                const result = await userModel.deleteOne({ _id: uid });
                if (result.deletedCount > 0) {
                    const purchaser = mailUser
                    const mailSubject = 'Your account was deleted'
                    const mailText = `The admin deleted his account because he had no activity in the last 2 days or more.`
                    await sendMailTo(purchaser, mailSubject, mailText)
                    return { status: 200, message: 'User deleted' };
                } else {
                    return { status: 404, message: "User not found" };
                }
            } else {
                return { status: 403, message: 'The user cannot be deleted because they do not have inactivity of 2 or more days' };
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return { status: 500, message: 'Error interno del servidor' };
        }
    }
    
    
}