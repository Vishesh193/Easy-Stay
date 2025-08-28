export const otpEmailTemplate = (name, otp) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #FF5A5F;">Verify Your Email</h2>
            <p>Hello ${name},</p>
            <p>Welcome to Ease Stay Please use the following OTP to verify your email address:</p>
            <div style="background-color: #f8f8f8; padding: 20px; text-align: center; margin: 20px 0;">
                <h1 style="color: #FF5A5F; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
            </div>
            <p>This OTP will expire in 5 minutes.</p>
            <p>If you didn't request this OTP, please ignore this email.</p>
            <p>Best regards,<br>The Ease Stay Team</p>
        </div>
    `
}

export const welcomeEmailTemplate = (name) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #FF5A5F;">Welcome to Ease Stay!</h2>
            <p>Hello ${name},</p>
            <p>Thank you for signing up with our Ease Stay. We're excited to have you on board!</p>
            <p>You can now:</p>
            <ul>
                <li>Browse available listings</li>
                <li>Book accommodations</li>
                <li>Create your own listings</li>
            </ul>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The Ease Stay Team</p>
        </div>
    `
}

export const loginNotificationTemplate = (name) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #FF5A5F;">New Login Detected</h2>
            <p>Hello ${name},</p>
            <p>We noticed a new login to your Ease Stay account.</p>
            <p>If this was you, you can ignore this email. If you didn't log in, please secure your account immediately.</p>
            <p>Time of login: ${new Date().toLocaleString()}</p>
            <p>Best regards,<br>The Ease Stay Team</p>
        </div>
    `
}
