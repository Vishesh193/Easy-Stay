import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Create transporter with more detailed configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
})

// Verify transporter connection
const verifyConnection = async () => {
    try {
        await transporter.verify()
        console.log('Email server connection verified')
        return true
    } catch (error) {
        console.error('Email server connection failed:', error)
        return false
    }
}

// Call verify immediately
verifyConnection()

export const sendEmail = async (to, subject, html) => {
    try {
        // Verify connection before sending
        if (!await verifyConnection()) {
            throw new Error('Email server connection failed')
        }

        console.log('Attempting to send email to:', to)
        
        const mailOptions = {
            from: {
                name: 'Ease Stay',
                address: process.env.EMAIL_USER
            },
            to,
            subject,
            html
        }
        
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent successfully:', info.messageId)
        return true
    } catch (error) {
        console.error('Email sending failed. Details:', {
            error: error.message,
            code: error.code,
            command: error.command,
            responseCode: error.responseCode
        })
        throw error
    }
}
