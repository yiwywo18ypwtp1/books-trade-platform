import nodemailer from "nodemailer";
import { HttpError } from "../../utils/HttpError";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendMail = async (to: string, subject: string, text: string, html: string) => {
    try {

        await transporter.sendMail({
            from: `"Books Trade" <${process.env.MAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
    } catch (err) {
        console.log(err);
        throw new HttpError("Unable to send email", 500);
    }
};