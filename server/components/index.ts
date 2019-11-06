import {productRoute} from "./products";
import { categoryRoutes } from "./categories";
import { userRoute } from "./user";
import { cartRoute } from "./cart";
import { reviewRoute } from "./reviews";

export const routers = [
    productRoute, 
    categoryRoutes, 
    userRoute,
    cartRoute,
    reviewRoute
]