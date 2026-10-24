import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve("src\\.env.dev") });

export const PORT = Number(process.env.PORT) || 3000;
export const DBURI = process.env.DBURI;

export const ECRYPT_KEY = process.env.ECRYPT_KEY;
export const DECRYPT_KEY = process.env.DECRYPT_KEY;
export const SALT_ROUND = Number(process.env.SALT_ROUND);

export const USER_ACCESS_TOKEN_SIGNATURE = process.env.USER_ACCESS_TOKEN_SIGNATURE;
export const ADMIN_ACCESS_TOKEN_SIGNATURE = process.env.ADMIN_ACCESS_TOKEN_SIGNATURE;
export const ACCESS_TOKEN_EXPIRES = Number(process.env.ACCESS_TOKEN_EXPIRES);

export const USER_REFRESH_TOKEN_SIGNATURE = process.env.USER_REFRESH_TOKEN_SIGNATURE;
export const ADMIN_REFRESH_TOKEN_SIGNATURE = process.env.ADMIN_REFRESH_TOKEN_SIGNATURE;
export const REFRESH_TOKEN_EXPIRES = Number(process.env.REFRESH_TOKEN_EXPIRES)

export const REDIS_URL = process.env.REDIS_URL;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;