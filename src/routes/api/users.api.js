import { Router } from "express"
import {changePremium, addFile, resetPass,deleteFile, deleteUser,getUsersApi} from "../../controllers/users.controller.js"
import upload from '../../configs/multer.config.js';

const router = Router()

// [GET] 🌐/api/users
router.get('/', getUsersApi)

//?[POST] 🌐/api/users/restPass
router.post('/restPass', resetPass)

//?[POST] 🌐/api/users/:uid/documents
router.post('/:uid/documents',upload.array('files'),addFile)

//![DELETE] 🌐/api/users/{{userId}}/documents/${documentId}
router.delete('/:uid/documents/:did',deleteFile)

//?[PUT] 🌐/api/users/premium/:uid
router.put('/premium/:uid',changePremium)

//![DELETE] 🌐/api/users/:uid
router.delete('/:uid',deleteUser)


export default router
