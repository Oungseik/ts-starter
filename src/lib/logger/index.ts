import { levels, logger } from "./winston";

const log = (level: keyof typeof levels) => (message: string) =>
	logger.log({ level, message, time: new Date() });

export default {
	error: log("error"),
	warn: log("warn"),
	info: log("info"),
};
