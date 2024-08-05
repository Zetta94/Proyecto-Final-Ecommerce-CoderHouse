import {Router} from "express"
import {generateTicket} from "../../controllers/tickets.controller.js"
const router = Router()

// [GET] 🌐/tickets/generate
router.post('/generate', generateTicket)
export default router