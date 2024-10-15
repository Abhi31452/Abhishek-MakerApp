import { Application, Response, Request } from "express";
import * as express from "express";
import * as  dotenv from "dotenv";
import { connection } from "./connectDB/connectMongoDb";
import { route } from './routes/routes'
import { isLoggedin } from './util/auth.middleware';
// import {cookieParser} from 'cookie-parser';
const cookieParser = require('cookie-parser');
const Cors = require("cors");


const app: Application = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(Cors( {credentials:true,origin:true}));

app.listen(process.env.PORT, () => {
  connection();
  console.log(" Server Running in port  : ", process.env.PORT)
})

app.use("/api", route);

app.get("/", (req: Request, res: Response) => {
  console.log(" Welcome ");
})


