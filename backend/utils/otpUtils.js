// Temporary storage for OTPs with expiration
const otpStore = new Map();

export const storeOTP = (email, otp) => {
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 5); // OTP expires in 5 minutes
    
    otpStore.set(email, {
        otp,
        expiry: expiryTime
    });
};

export const verifyOTP = (email, userOtp) => {
    const storedData = otpStore.get(email);
    
    if (!storedData) {
        return { valid: false, message: "OTP expired or not found" };
    }
    
    if (new Date() > storedData.expiry) {
        otpStore.delete(email);
        return { valid: false, message: "OTP has expired" };
    }
    
    if (storedData.otp !== userOtp) {
        return { valid: false, message: "Invalid OTP" };
    }
    
    // Delete OTP after successful verification
    otpStore.delete(email);
    return { valid: true };
};

// Generate a random 6-digit OTP
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
