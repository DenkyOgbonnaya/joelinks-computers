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

if(process.env.NODE_ENV == 'production'){
    app.get('*', (req:Request, res:Response) => {
        //the compiled server.js file is servered from "./build/server.js"
        //so dist folder is in ../client/dist..
        res.sendFile(path.join("../client", "/dist/client", "index.html"));
    })
}

connectDatabase();
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
} );