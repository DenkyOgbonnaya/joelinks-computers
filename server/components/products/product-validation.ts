import { check } from "express-validator";

export const validateProduct = [
    check("name", "name must be 3 letters long").isLength({min:3}),
    check("price", "price is required").isNumeric().isLength({min:1}),
    check("discountedPrice", "discounted price must be numeric").optional().isNumeric().isLength({min:1}),
    check("quantity", "numeric quantity is required").isNumeric().isLength({min:1}),
    check("brand", "brand name must be min of 3 letters long").isLength({min:3}),
    check("description", "discription must be 150 letters max").isLength({max:150}),
    check("category", "category is required").isLength({min:2}),
    check("attributes.processor", "processor too short").optional().isLength({min:5}),
    check("attributes.ram", "ram too short").optional().isLength({min:2}),
    check("attributes.size", "size too short").optional().isLength({min:2}),
]