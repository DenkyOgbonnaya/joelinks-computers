import express, {Request, Response} from 'express';
import passportSetup from "./server/utills/config/passport-setup";
import { applyMiddleware, applyRoutes } from "./server/utills";
import middleware from "./server/middlewares";
import { routers } from "./server/components";
import connectDatabase from "./server/database";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8080
passportSetup();
applyMiddleware(middleware, app);
applyRoutes(routers, app);
app.use('/public', express.static(__dirname + '/public'));

app.use(express.static(path.join(__dirname + "/client/dist/client")))
if(process.env.NODE_ENV == 'production'){
    app.get('*', (req:Request, res:Response) => {
        res.sendFile(path.join(__dirname + '/client/dist/client', 'index.html'));
    })
}

connectDatabase();
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
} );