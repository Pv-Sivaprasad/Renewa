import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


dotenv.config()


export class MailService{
    private transporter;

    constructor(){
        this.transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                pass:process.env.NODEMAILER_PASSWORD
            }
        })
    }


    async sendOtpEmail(recipientEmail:string,otp:string) {
        try {
            const mailOptions={
                from:process.env.NODEMAILER_EMAIL,
                to:recipientEmail,
                subject:'Your OTP for registration',
                text:`Your OTP for registration is ${otp}`,
                html: `<p>Your OTP for registration is: <strong>${otp}</strong></p>`
            }


            const info=await this.transporter.sendMail(mailOptions)
            console.log('email sent successfully',info.response);
            

        } catch (error) {
            console.log('Error in sending otp through email',error);
            throw new Error('Failed to send OTP')
        }
    }



}