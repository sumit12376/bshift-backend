
export function generateOtp(length: number = 6): string {
    if (typeof length !== 'number' || length <= 0 || length > 16) {
        throw new Error('Invalid OTP length. Length should be a positive integer between 1 and 16.');
    }
    
    const digits = '0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }
    
    return otp;
}

// const otp = generateOtp();
// console.log(otp);
