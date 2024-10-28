import crypto from "crypto";
export const userVerificationToken = async () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};
