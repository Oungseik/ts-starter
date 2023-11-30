import winston from "winston";

import { config } from "../../config";

export const levels = { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 };

export const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
		}),
		new winston.transports.File({
			filename:
				config.NODE_ENV === "Production"
					? "logs/prod-combined.log"
					: config.NODE_ENV === "Testing"
					  ? "logs/test-combined.log"
					  : "logs/dev-combined.log",
		}),
	],
	levels,
});
