import { Router, Request, Response } from "express";
import axios from "axios"; // Import the axios library
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { InstagramLogin } from "../../actions/Instagram/InstagramLogin";
import GetUserInformation from "../../actions/Instagram/GetUserInformation";
import validateUUIDMiddleware from "../ValidatedUUIDHeader";
import QueryUserDetails from "../../actions/Instagram/QueryUserDetails";
import PagesThatAreConnected from "../../actions/Instagram/PagesThatAreConnected";
import AddConnectedPagesToSupabase from "../../actions/Instagram/AddConnectedPagesToSupabase";
import GetInstagramBusinessAccountId from "../../actions/Instagram/GetInstagramBusinessAccountId";
import GetMediaInsight from "../../actions/Instagram/GetMediaInsights";
import GetAccountInsight from "../../actions/Instagram/GetAccountInsight";
const router = Router();
declare global {
  namespace Express {
    interface Request {
      uuid?: string;
    }
  }
}
const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Google Sign-In</title>
    </head>
    <body class="container mx-auto p-4 px-10">
    <div class="w-full h-full  sm:px-20  items-center justify-center"><h1  class=" bg-black text-gray-200 rounded-xl shadow-xl py-4 px-4 font-bold transition duration-300 transform hover:scale-105 hover:ring-light-accent focus:outline-none ring ring-gray-300">
        Connection Succeeded
      </h1></div>
      

   
    </body>
    </html>
  `;
const REDIRECT_URI =
  "https://ebc5-129-205-113-159.ngrok-free.app/instagram/confirm";
router.get("/confirm", async (req, res) => {
  const { code } = req.query as { code: string }; // Explicitly cast `code` to string

  try {
    const redirectUri = REDIRECT_URI;
    const clientId = process.env.IG_CLIENT;
    const clientSecret = process.env.IG_SECRET;

    // Create a FormData object to send as the request body
    const formData = new FormData();
    formData.append("client_id", clientId);
    formData.append("client_secret", clientSecret);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", redirectUri);
    formData.append("code", code);

    // Set the headers manually
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded", // Set the correct content type
    };

    // Make a POST request to Instagram's OAuth access token endpoint
    const response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      formData,
      {
        headers: headers, // Set headers
      }
    );

    const result = response.data;
    const newUUID = uuidv4();
    const uid: any = await InstagramLogin(result, newUUID);
    console.log(uid);
    res.json({ uid }); // Return the access token in the response
  } catch (error) {
    console.error("Error while fetching Instagram access token:", error);
    res.status(500).json({ error: "Failed to fetch Instagram access token." });
  }
});

router.post("/adduser", (req: Request, res: Response) => {
  const { access_token, user_id, pageid } = req.body;
  console.log(access_token, user_id, pageid);
  res.status(200).json({ message: "done" });
});
router.get("/confirmed", (req: Request, res: Response) => {
  res.send(html);
});
router.get(
  "/isuserregistered",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { instagramid } = await QueryUserDetails(req.uuid);
      const data = instagramid;
      res.json({ data });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/user",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    // const token = req.query.token as string;
    // or const { token } = req.query as { token: string };

    try {
      const { instagramid, token } = await QueryUserDetails(req.uuid);

      const data = await GetUserInformation(instagramid, token);
      res.json({ data });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/pages",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { token } = await QueryUserDetails(req.uuid);
      const data = await PagesThatAreConnected(token);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

router.post(
  "/confirmpages",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { uuid } = await QueryUserDetails(req.uuid);
      const { pages } = req.body;
      if (pages.length > 1) {
        res.status(403).json({ message: "Please only select a page" });
      } else {
        await pages.map(async (page: any) => {
          await AddConnectedPagesToSupabase(page, uuid);
        });
        res.status(200).json({ message: "done" });
      }
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.post(
  "/registeruser",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    try {
      const {page}= req.body
      //const { uuid } = await QueryUserDetails(req.uuid);
      await GetInstagramBusinessAccountId(page,req.uuid);
      res.status(200).json({ message: "done" });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/mediainsight",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { media_id } = req.query as { media_id: string };
      const { ig_token } = await QueryUserDetails(req.uuid);
      const data = await GetMediaInsight(media_id, ig_token);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/accountinsight",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { user_id } = req.query as { user_id: string };
      const { ig_token } = await QueryUserDetails(req.uuid);
      const data = await GetAccountInsight(user_id, ig_token);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

export default router;
