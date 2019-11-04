import express, {Request, Response} from 'express';

import { applyMiddleware, applyRoutes } from "./server/utills";
import middleware from "./server/middlewares";
import { routers } from "./server/components";
import connectDatabase from "./server/database";

const app = express();
const PORT = process.env.PORT || 8080

applyMiddleware(middleware, app);
applyRoutes(routers, app);

app.get('/', (req:Request, res: Response) => {
    res.status(200).send('hurray! app is working!.');
})

connectDatabase();
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
} );