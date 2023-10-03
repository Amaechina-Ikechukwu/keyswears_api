import express, { Request, Response, NextFunction } from "express";
import pagesWebhookRouter from "./webhooks/PageWebhook";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS to allow all origins, methods, and headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow specified HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specified headers
  next();
});

////////////////////////////////
app.use("/", pagesWebhookRouter);
// Add your other middleware and routes here
////////////////////////////////

app.listen(port, () => {
  console.log("App is ready");
});
