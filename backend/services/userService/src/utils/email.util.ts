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


    // async sendOtpEmail(recipientEmail:string,otp:string) {
    //     try {
    //         const mailOptions={
    //             from:process.env.NODEMAILER_EMAIL,
    //             to:recipientEmail,
    //             subject:'Your OTP for registration',
    //             text:`Your OTP for registration is ${otp}`,
    //             html: `<p>Your OTP for registration is: <strong>${otp}</strong></p>`
    //         }


    //         const info=await this.transporter.sendMail(mailOptions)
    //         console.log('email sent successfully',info.response);
            

    //     } catch (error) {
    //         console.log('Error in sending otp through email',error);
    //         throw new Error('Failed to send OTP')
    //     }
    // }
    async sendOtpEmail(recipientEmail: string, otp: string) {
        try {
            const mailOptions = {
                from: process.env.NODEMAILER_EMAIL,
                to: recipientEmail,
                subject: 'Your OTP for registration',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
                    <div style="text-align: center; padding-bottom: 20px;">
                        <img src="https://kopiko-clone-wpq3.onrender.com/Images/back.png" alt="Renewa Logo" style="width: 150px; height: auto;" />
                    </div>
                        <!-- Heading Section -->
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
                            <h1 style="color: #333333; text-align: center;">Welcome to Renewa</h1>
                            <p style="color: #333333; font-size: 16px; text-align: center;">Thank you for registering with us! Please use the OTP below to complete your registration:</p>
                            
                            <!-- OTP Section -->
                            <div style="text-align: center; margin: 20px 0;">
                                <p style="font-size: 24px; color: #4CAF50; font-weight: bold;">${otp}</p>
                            </div>
    
                            <p style="color: #333333; font-size: 14px; text-align: center;">If you did not request this OTP, please ignore this email.</p>
                        </div>
    
                        <!-- Footer Section -->
                        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
                            <p>© 2024 Renewa. All rights reserved.</p>
                            <p>Renewa Inc, 1234 Street, Shornur, India</p>
                        </div>
                    </div>
                `,
               
            };
    
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully', info.response);
        } catch (error) {
            console.log('Error in sending OTP through email', error);
            throw new Error('Failed to send OTP');
        }
    }
    
    


}