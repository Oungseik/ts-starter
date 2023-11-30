/**
 * Import your all ENVIRONMENTAL VARIABLES here
 */
import dotenv from "dotenv";
dotenv.config();

export const config = {
	port: process.env.PORT || 8080,
	NODE_ENV: process.env.NODE_ENV,
};
