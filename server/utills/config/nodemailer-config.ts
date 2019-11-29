import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailUser:any = process.env.MAIL_USER;
const mailPass:any = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: mailUser,
        pass: mailPass
    }
});

const sendMail = async(sender:string, email:string, subject:string, message:string) =>{
    try {
        return await transporter.sendMail({
            from: `${sender} <${email}>`,
            to: mailUser,
            subject,
            html: `<p> ${message} </p>`
        })

    } catch (err) {
        throw err;
    }
}

export default sendMail;
