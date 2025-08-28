
const otpStore = new Map();

export const storeOTP = (email, otp) => {
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 5); 
    
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
    
 
    otpStore.delete(email);
    return { valid: true };
};


export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
