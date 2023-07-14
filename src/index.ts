//@ts-ignore
import express , {Request,Response,NextFunction} from "express";
import { loginDetails } from "./controllers/GetLoginDetails";
import 'dotenv/config'
const app = express();
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://5a37-129-205-113-166.ngrok-free.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.post("/login", async (req:Request, res:Response) => {
  const data = req.body;
  try {
    if(!data.userId || !data.token){
    res.status(400).json({error:`You are either missing user id or user token`})
  }
   else {const result = await loginDetails(data);
       res.status(200).json({ message: result });
   }  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/webhook", (req: any, res: any) => {
  if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", (req: any, res: any) => {
  const body = req.body;
 if (body.object === 'page' && body.entry) {
    for (const entry of body.entry) {
      if (entry.changes) {
        for (const change of entry.changes) {
          if (change.field === 'feed' && change.value && change.value.item === 'comment') {
            const comment = change.value;
            console.log('New comment:', comment);
            // Take any desired actions based on the received comment information
          }
        }
      }
    }
  }
});
   app.listen(3000,()=>{
    console.log('App is ready')
   });