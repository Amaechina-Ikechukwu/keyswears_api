//@ts-ignore
import express, { Request, Response, NextFunction } from "express";
import pagesWebhookRouter from "./webhooks/PageWebhook";
import "dotenv/config";
const app = express();
import pagesRouter from "./middlewares/Routing/pageroutes";
import igRouter from "./middlewares/Routing/instagramroutes";
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    "https://chooyagroup.com",
    "https://496a-197-211-52-68.ngrok-free.app",
  ];
  const origin: string | undefined = req.headers.origin;

  // Check if the request origin is in the allowed origins list
  if (origin && allowedOrigins.includes(origin)) {
    // Allow the specific origin
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // For any other origin (except localhost), allow it
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

////////////////////////////////
app.use("/", pagesWebhookRouter);
app.use("/", pagesRouter);
app.use("/instagram", igRouter);
////////////////////////////////

app.listen(3003, () => {
  console.log("App is ready");
});
