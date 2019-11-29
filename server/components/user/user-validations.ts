import { check, validationResult } from "express-validator";

export const validateSignUpData=  [
    check('username', 'username is required or too short').isLength({min: 2}),
    check('email', 'valid email  is required').isEmail(),
    check('password', 'password is required or too short').isLength({min: 3})
]
export const validateLoginData= [
    check('username', 'username is required or too short').isLength({min: 2}),
    check('password', 'password is required or too short').isLength({min: 3})
]
export const validateProfileData = [
    check('firstname', 'firstname is required').notEmpty(),
    check('lastname', 'lastname  is required').notEmpty(),
    check('phone', 'enter a valid phone number').isLength({min: 11}),
    check('address', 'valid address  is required').isLength({min: 5}),
    check('city', 'city is required or too short').isLength({min: 2}),
    check('state', 'state is required or too short').isLength({min: 2}),
]
