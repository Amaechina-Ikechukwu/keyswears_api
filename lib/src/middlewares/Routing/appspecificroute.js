"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CheckBody_1 = __importDefault(require("../CheckBody"));
const GetLoginDetails_1 = require("../../controllers/GetLoginDetails");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    const { auth } = req.query;
    if (auth) {
        req.redirectUri = auth;
    }
    next();
});
router.post("/login", (0, CheckBody_1.default)("userId", "token"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const newUUID = (0, uuid_1.v4)();
    try {
        const result = yield (0, GetLoginDetails_1.loginDetails)(data, newUUID);
        res.status(200).json({ message: result });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get("/auth", (req, res) => {
    const html = `<!DOCTYPE html>
    <html lang="en">
       <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <script
      async
      defer
      crossorigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js"
    ></script>
    <title>Document</title>
  </head>
  <body class="w-full h-full flex items-center justify-center px-11">
    <div id="fb-root"></div>
    <div class="rounded-lg w-full min-h-screen flex flex-col justify-center">
      <div
        class="flex flex-col items-center sm:justify-around sm:flex-row-reverse space-y-11 sm:space-y-0"
      >
        <div class="flex mt-7 sm:mt-0 justify-center sm:items-center">
          <img
            src="/socials.jpg"
            class="w-80 h-fit sm:w-96 sm:h-auto rounded-lg shadow-lg object-cover object-center"
            alt="facebook meta"
          />
        </div>
        <div class="space-y-4 sm:space-y-8">
          <h1 class="text-3xl text-center sm:text-left font-bold text-gray-500">
            Do more with Facebook Pages!
          </h1>

          <!-- Custom Facebook login button -->
          <button
            id="fbLoginButton"
            class="bg-blue-500 w-full text-white rounded-sm shadow-md capital px-2 py-4 drop-shadow-xl hover:drop-shadow-xl hover:scale-105 active:scale-95 scale-100 hover:transition ease-in-out delay-50"
          >
            Sign Up With Facebook
          </button>
        </div>
      </div>
    </div>

        <!-- JavaScript to handle Facebook login -->
        <script>
          window.fbAsyncInit = function () {
            FB.init({
              appId: "533621215529346",
              cookie: true,
              xfbml: true,
              version: "v18.0",
            });
          };
      
          // Load the SDK asynchronously
          (function (d, s, id) {
            var js,
              fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
          })(document, "script", "facebook-jssdk");
      
          document
            .getElementById("fbLoginButton")
            .addEventListener("click", async () => {
              try {
                const response = await new Promise((resolve, reject) => {
                  FB.login(
                    (response) => {
                      if (response.authResponse) {
                        resolve(response);
                      } else {
                        reject("Login failed or user cancelled.");
                      }
                    },
                    {
                      scope:
                        "public_profile,email,pages_manage_metadata,pages_manage_posts,business_management,pages_show_list,page_events,pages_read_engagement,pages_read_user_content,pages_manage_engagement,instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,instagram_shopping_tag_products,pages_show_list,pages_read_engagement",
                    }
                  );
                });
      
                const data = {
                  userId: response.authResponse.userID,
                  token: response.authResponse.accessToken,
                  uuid: "${req.redirectUri}" // Use the redirectUri from the request
                };
      
                const fetchResponse = await fetch(
                  "/login",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }
                );
      
                const responseData = await fetchResponse.json();
      
                console.log(responseData.message);
                
                // Construct the Expo app link with the token parameter
                const expoAppLink = "${req.redirectUri}?token=" + responseData.message;
      
                // Redirect the user to the Expo app link
                window.location.href = expoAppLink;
              } catch (error) {
                console.error("Error during login:", error);
              }
            });
        </script>
      </body>
    </html>`;
    res.send(html);
});
router.get("/backtoapp/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Handle any processing or redirects back to the app if needed
    }
    catch (error) {
        // Handle errors
        console.error("Error during authentication:", error.message);
        res.status(500).send("Authentication error");
    }
}));
exports.default = router;
//# sourceMappingURL=appspecificroute.js.map