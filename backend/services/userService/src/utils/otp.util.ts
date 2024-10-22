export const generateOtp=()=>{
    const otp=Math.floor(100000 + Math.random() * 900000).toString()
    console.log(otp,'this is the otp generator')
    return otp
}