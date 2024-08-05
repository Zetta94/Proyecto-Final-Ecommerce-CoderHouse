import sendMailTo from "../configs/notifications/nodemailer.config.js"
import ticketManager from "../dao/classes/ticket.dao.js"

const manager = new ticketManager()

export const generateTicket = async (req, res) => {
    try {
        const { code, amount, purchaser } = req.body;
        const status = await manager.newTicket(code, amount, purchaser)
        
        //Enviar mail...
        const mailSubject = 'Detalle de su compra'
        const mailText = `Gracias por su compra. Aquí está el detalle de su ticket:\n\nCódigo: ${code}\nMonto total $: ${amount}\n`
        await sendMailTo(purchaser, mailSubject, mailText)
        req.logger.info('Ticket generado correctamente')
        res.status(201).json({ status: 'Ticket generado correctamente', data: status })
    } catch (error) {
        req.logger.error('Error al generar ticket')
        res.status(500).json({ error: `Server error: ${error.message}` })
    }
}