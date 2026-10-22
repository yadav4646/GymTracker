import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

//main root file
const app = createApp();

app.listen(env.port, () => {
  logger.info(`Server is running on ${env.port}`);
});
