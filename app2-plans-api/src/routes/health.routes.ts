import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.sendStatus(200).json({
    success: true,
    message: "Health route is working",
  });
});
