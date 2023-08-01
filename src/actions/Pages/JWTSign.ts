import jwt from "jsonwebtoken";

// Replace this secret key with your own
const secretKey = "lindasalespro";

// Replace 'YourPayloadType' with the actual type of your payload
interface YourPayloadType {
  // Add properties of your payload here
  uuid: string;
  userid: string;
  token: string;
}

export default async function SignToken(
  payload: YourPayloadType
): Promise<string> {
  const token = jwt.sign(payload, secretKey, { expiresIn: "1d" }); // Token will expire in 1 day
  return token;
}
