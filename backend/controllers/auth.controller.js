import genToken from "../config/token.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { sendEmail } from "../config/email.js"
import { otpEmailTemplate, welcomeEmailTemplate, loginNotificationTemplate } from "../utils/emailTemplates.js"
import { generateOTP, storeOTP, verifyOTP } from "../utils/otpUtils.js"

export const sendOTP = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        try {
            const otp = generateOTP();
            console.log('Generated OTP for email:', email); // Debug log
            
            storeOTP(email, otp);
            console.log('Stored OTP successfully'); // Debug log

            await sendEmail(
                email,
                "Verify Your Email - Airbnb Clone",
                otpEmailTemplate(name, otp)
            );
            console.log('Email sent successfully'); // Debug log

            return res.status(200).json({ message: "OTP sent successfully" });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            return res.status(500).json({ message: "Failed to send verification email. Please try again." });
        }
    } catch (error) {
        console.error("Send OTP error:", error);
        return res.status(500).json({ message: "Failed to process signup request" });
    }
};

export const verifySignup = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;

        const verificationResult = verifyOTP(email, otp);
        if (!verificationResult.valid) {
            return res.status(400).json({ message: verificationResult.message });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        // Send welcome email
        await sendEmail(
            email,
            "Welcome to Airbnb Clone!",
            welcomeEmailTemplate(name)
        );

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(user);
    } catch (error) {
        console.error("Verify signup error:", error);
        return res.status(500).json({ message: "Signup failed" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Send login notification email
        await sendEmail(
            email,
            "New Login to Your Account",
            loginNotificationTemplate(user.name)
        );

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 15 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Login failed" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Logout failed" });
    }
};


