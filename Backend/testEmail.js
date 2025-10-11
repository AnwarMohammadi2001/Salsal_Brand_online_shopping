import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendTest() {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "hussain.mohammadi1380@gmail.com", // test email
      subject: "Test email",
      text: "Hello from Nodemailer",
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error(error);
  }
}

sendTest();
