import express from "express";

import cors from "cors";
import { apiRouter } from "./routes";

export function createApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api", apiRouter);
    return app;
}
