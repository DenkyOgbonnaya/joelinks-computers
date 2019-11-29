import { Request, Response } from "express";
import sendMail from "../../utills/config/nodemailer-config";

const contactUsController = {
    async sendMail(req:Request, res:Response){
        const {name, subject, email, message} = req.body;
        try {
            const result = await sendMail(name, email, subject, message);
            if(result)
                return res.status(200).send({message: "Mail sent successfully"})
            return res.status(500).send({message: "fail to send mail"})
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
export default contactUsController;