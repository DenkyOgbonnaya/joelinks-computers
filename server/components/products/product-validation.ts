import { check } from "express-validator";

export const validateProduct = [
    check("name", "name is required").notEmpty(),
    check("price", "price is required").isNumeric().notEmpty(),
    check("discountedPrice", "discounted price must be numeric").optional().isNumeric().isLength({min:1}),
    check("quantity", "numeric quantity is required").isNumeric().notEmpty(),
    check("brand", "brand is required").notEmpty(),
    check("description", "discription must be 150 letters max").isLength({max:1000}),
    check("category", "category is required").notEmpty(),
    check("attributes.processor", "processor too short").optional().isLength({min:5}),
    check("attributes.ram", "ram too short").optional().isLength({min:2}),
    check("attributes.size", "size too short").optional().isLength({min:2}),
]