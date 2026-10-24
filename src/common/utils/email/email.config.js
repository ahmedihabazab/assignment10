import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USER } from "../../../config/config.js";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use any Service ID from the table below (matching is case-insensitive)
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export async function sendMail() {
    try {
  const info = await transporter.sendMail({
    from: '"Example Team" <ahmedihab767@gmail.com>', // sender address
    to: "36408bc66c@emailnox.live", // list of recipients
    subject: "Hello", // subject line
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}
