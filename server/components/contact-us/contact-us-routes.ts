import { Router } from "express";
import contactUsController from "./contact-us-controller";
import { validateContactUsData } from "./contact-us-validation";
import validationResult from "../../middlewares/validation";

const contactUsRouter = Router();
const{sendMail} = contactUsController;

contactUsRouter.post("/contact", validateContactUsData, validationResult, sendMail)

const api = {
    path: "/api",
    router: contactUsRouter
}

export default api;