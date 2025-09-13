import express from "express";
import { ENV } from '../config/env';
import routes from "../routes/routes";

const app = express();
app.use(express.json());
app.use("/", routes);



export const startServer = () => {
    app.listen(ENV.PORT , ()=>{
        console.log(`Lerveur ecoute sur le port : http://localhost:${ENV.PORT}`)
    })
}

export default app;