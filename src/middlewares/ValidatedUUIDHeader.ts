import { validate as uuidValidate } from "uuid"; // Import uuid4 generator
import VerifyToken from "./JWTVerify";

// Extend the Request interface to include a 'uuid' property
declare global {
  namespace Express {
    interface Request {
      uuid?: string;
    }
  }
}

// External middleware to validate UUID in the bearer token
const validateUUIDMiddleware = (req: any, res: any, next: any) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Invalid or missing bearer token" });
  }

  const token = authorizationHeader.substring(7); // Remove "Bearer " from the header
  const verifiedToken = VerifyToken(token);
  console.log(verifiedToken);
  // const uuid = extractUUIDFromToken(verifiedToken?.uuid);
  const uuid = verifiedToken?.uuid;

  if (!uuid) {
    return res.status(400).json({ error: "Missing UUID in the bearer token" });
  }

  if (!uuidValidate(uuid)) {
    return res.status(400).json({ error: "Invalid bearer token" });
  }

  // If the UUID is valid, attach it to the request object for use in the route handler

  req.uuid = uuid;
  next(); // Call next() to pass control to the next middleware/route handler
};

// Helper function to extract the UUID from the token
// function extractUUIDFromToken(token: string): string | null {
//   // Implement the logic to extract the UUID from the token based on your token format
//   // For example, if your token contains the UUID at a specific position, you can use string manipulation to extract it
//   // Alternatively, if the UUID is encoded in the token payload, you can decode the payload and retrieve the UUID
//   // Replace the following line with your actual implementation

//   // Example: Assuming the token contains the UUID in the last 36 characters
//   return token.slice(-36);
// }

export default validateUUIDMiddleware;
