import { Router } from "express"
import UserManager from "../../controllers/users.controller.js"

const manager = new UserManager()

const router = Router()

router.post('/restPass', async (req, res) => {
    req.logger.http('Route POST: /api/restPass');
    const { email, newPassword } = req.body;
    try {
        const updatedPass = await manager.restorePassword(email, newPassword);
        req.logger.info("Nueva password generada");
        res.status(200).send({ message: "Contraseña actualizada exitosamente, redirigiendo..." })
    } catch (error) {
        req.logger.warning(error.message);
        if (error.message === "Usuario no encontrado") {
            res.status(401).send({ message: "El mail no coincide con ningún mail en uso" });
        } else if (error.message === "La nueva contraseña y la anterior no deben coincidir") {
            res.status(403).send({ message: "Error: La contraseña nueva debe ser distinta a la anterior" });
        } else {
            res.status(500).send({ message: "Error al actualizar la contraseña" });
        }
    }
})

router.post('/premium/:uid', (req, res) => {
    const { uid } = req.params
    try{

    }catch(error){
        req.logger.error('Error al cambiar tipo de usuario')
    }
})

export default router
