import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'i.xor.email', // Your Stalwart server hostname
  port: 587, // Typically 587 for TLS or 465 for SSL
  secure: false, // Set to true if using port 465 (SSL)
  auth: {
    user: process.env.EMAIL_USER, // SMTP username
    pass: process.env.EMAIL_PASSWORD // SMTP password
  },
  tls: {
    rejectUnauthorized: false // Set to false if using self-signed certificates
  }
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'Your MERN App" <testuser1@xor.email>',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};