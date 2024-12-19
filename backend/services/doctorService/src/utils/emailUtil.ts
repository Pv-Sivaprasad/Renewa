import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class MailService {
  private transporter;

  constructor() {
    const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

    if (!NODEMAILER_EMAIL || !NODEMAILER_PASSWORD) {
      throw new Error('Nodemailer email or password is not configured in the environment variables');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
      },
    });
  }

  async sendConfirmMail(recipientEmail: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: recipientEmail,
        subject: 'Selected as a Doctor in Renewa',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <img src="https://kopiko-clone-wpq3.onrender.com/Images/back.png" alt="Renewa Logo" style="width: 150px; height: auto;" />
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
              <h1 style="color: #333333; text-align: center;">Welcome to Renewa</h1>
              <p style="color: #333333; font-size: 16px; text-align: center;">Thank you for registering with us! You have been selected as a doctor. Please login with your credentials.</p>
              <p style="color: #333333; font-size: 14px; text-align: center;">If you did not request this, please ignore this email.</p>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
              <p>© 2024 Renewa. All rights reserved.</p>
              <p>Renewa Inc, Brototype Infotech, Calicut, India</p>
            </div>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
     
    } catch (error) {
      console.error('Error in sending email:', error);
      throw new Error('Failed to send confirmation email');
    }
  }
}

