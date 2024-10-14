import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  Signature_Key: process.env.Signature_Key,
  Store_ID: process.env.Store_ID,
  Api_EndPoint: process.env.Api_EndPoint,
  email_pass: process.env.EMAIL_PASS,
  user_email: process.env.EMAIL_USER,
};
