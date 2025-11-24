import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter;

export const initEmailTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true if using port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  const transporter = initEmailTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Auburn Domino's" <no-reply@dominos-clone.com>`,
    to,
    subject,
    html,
  });
};
