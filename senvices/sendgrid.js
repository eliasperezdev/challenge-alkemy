import sgMail from "@sendgrid/mail"
import 'dotenv/config'

sgMail.setApiKey(process.env.NODESEND)

export default sgMail