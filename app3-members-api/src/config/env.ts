import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: Number(process.env.PORT || 4000),
    isProduction: (process.env.NODE_ENV ?? "development") === "production",
    dbPassword: process.env.DB_PASSWORD,
    dbUrl: process.env.DATABASE_URL,
} as const;
