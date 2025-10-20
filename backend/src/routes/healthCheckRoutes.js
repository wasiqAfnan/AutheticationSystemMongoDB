import express from "express";
const healthCheckRouter = express.Router();
import {
    dbPingController,
    healthCheckController,
} from "../controllers/healthCheckController.js";

healthCheckRouter.route("/").get(healthCheckController);
healthCheckRouter.route("/db-ping").get(dbPingController);

export default healthCheckRouter;
