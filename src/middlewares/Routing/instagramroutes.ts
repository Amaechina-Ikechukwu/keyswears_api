import { Router, Request, Response } from "express";
import axios from "axios"; // Import the axios library
import "dotenv/config";

const router = Router();
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
  "https://aa8b-129-205-113-160.ngrok-free.app/instagram/confirm";
router.get("/confirm", async (req, res) => {
  const { code } = req.query as { code: string }; // Explicitly cast `code` to string

  try {
    const redirectUri = REDIRECT_URI;
    const clientId = "6600635150017636";
    const clientSecret = "44419493af07f4ff46d0678060e2bc42";

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

    console.log(result);
    res.json({ access_token: result }); // Return the access token in the response
  } catch (error) {
    console.error("Error while fetching Instagram access token:", error);
    res.status(500).json({ error: "Failed to fetch Instagram access token." });
  }
});
router.get("/getaccess", async (req, res) => {
  const { code } = req.body;
  const redirectUri =
    "https://aa8b-129-205-113-160.ngrok-free.app/instagram/confirm";
  const clientId = "6600635150017636";
  const clientSecret = "44419493af07f4ff46d0678060e2bc42";

  try {
    const response = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          code: code,
        }).toString(),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
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

export default router;
