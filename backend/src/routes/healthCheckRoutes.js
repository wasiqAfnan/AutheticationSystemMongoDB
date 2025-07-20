import express from "express";
const healthCheckRouter = express.Router();
import { healthCheckController } from "../controllers/healthCheckController.js";

healthCheckRouter.route("/").get(healthCheckController);

export default healthCheckRouter;