import { check } from "express-validator";

export const validateCheckoutData = [
    check('firstname', 'firstname is required').notEmpty(),
    check('lastname', 'lastname is required').notEmpty(),
    check('email', 'valid email is required').isEmail(),
    check('phone', 'enter a valid phone number').isLength({min: 11}),
    check('address', 'valid address  is required').isLength({min: 5}),
    check('city', 'city is required or too short').isLength({min: 2}),
    check('state', 'state is required or too short').isLength({min: 2}),
]