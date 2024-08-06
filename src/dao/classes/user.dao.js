import userModel from "../models/user.model.js"


export default class UsersManager{
    async changeStatus(uid,premium){
        try {
            const result = await userModel.updateOne(
                { _id: uid },
                { premium: premium }
            )
            if (result.acknowledged === true) {
                return { code: 200, status: 'User status updated' }
            }
            return { code: 404, status: 'User not found' }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const users = await userModel.find({ role: { $ne: 'admin' } })
            return users
        } catch (error) {
            throw new Error('Error retrieving users: ' + error.message);
        }
    }
}