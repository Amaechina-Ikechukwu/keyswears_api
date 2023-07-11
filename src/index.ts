//@ts-ignore
import express  from "express";
import { loginDetails } from "./controllers/GetLoginDetails";
const app = express();
app.use(express.json());
app.post("/login", async (req:any, res:any) => {
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
   app.listen(3000,()=>{
    console.log('App is ready')
   });