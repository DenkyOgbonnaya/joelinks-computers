import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const checkValidationResult = (req:Request, res:Response, next:NextFunction) => {
    const result = validationResult(req);
    if(!result.isEmpty())
        return res.status(400).send({message: result.array()[0].msg})
    next();
}

export default checkValidationResult;