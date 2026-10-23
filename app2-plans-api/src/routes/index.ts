import { Router } from "express";
import { healthRouter } from "./health.routes";
import { allPlans } from "./plans.route";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(allPlans);
