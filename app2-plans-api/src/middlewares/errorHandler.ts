import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
class AppError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message);
    }
}
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    logger.error({ err }, "Unhandled error");
    if (err instanceof AppError) {
        res.status(err.status).json({
            error: {
                success: false,
                message: err.message,
            },
        });
        return;
    } else {
        res.status(500).json({
            error: {
                success: false,

                message: "Internal Server Error",
            },
        });
    }
}
