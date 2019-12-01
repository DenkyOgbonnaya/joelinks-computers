import {productRoute} from "./products";
import { categoryRoutes } from "./categories";
import { userRoute } from "./user";
import { cartRoute } from "./cart";
import { reviewRoute } from "./reviews";
import { checkoutRoute } from "./paystack";
import { orderRoute } from "./order";
import { contactUsRoute } from "./contact-us";
import { oauthRoutes } from "./oauth";

export const routers = [
    productRoute, 
    categoryRoutes, 
    userRoute,
    cartRoute,
    reviewRoute,
    checkoutRoute,
    orderRoute,
    contactUsRoute,
    oauthRoutes
]