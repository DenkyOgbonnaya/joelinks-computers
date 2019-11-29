import { check } from "express-validator";

export const validateContactUsData = [
    check("name", "Your name is required").notEmpty(),
    check("email", "Your email is required").isEmail(),
    check("subject", "subject is required").notEmpty(),
    check("message", "message body is required").notEmpty(),
    
]