//@ts-ignore
import express, { Request, Response, NextFunction } from "express";
import pagesWebhookRouter from "./webhooks/PageWebhook";
import "dotenv/config";
const app = express();
import pagesRouter from "./middlewares/Routing/pageroutes";
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ["https://chooyagroup.com"];
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
////////////////////////////////

app.listen(3000, () => {
  console.log("App is ready");
});
