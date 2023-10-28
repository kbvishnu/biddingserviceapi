import { Application } from "express";
import bidRouter from "../routes/bid.routes" 
import BidController from "../controller/BidController";
import { container } from "tsyringe";
import { registerDependencies } from "../di/DependencyRegister";
import PingController from "../controller/PingController";
import pingRouter from "./ping.routes";

export default function registerRoutes(app: Application) {

    registerDependencies();
    
     
    app.use("/ping", pingRouter(new PingController()));

    app.use('/bid', bidRouter(container.resolve(BidController)));


}