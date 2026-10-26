import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";

export function consoleLogger(
    _req: Request,
    res: Response,
    next: NextFunction,
): void {
    logger.info({ method: _req.method, url: _req.url });

    next();
}
