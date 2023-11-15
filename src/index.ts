import express, {Request, Response} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Route from "../src/routes/Routes"

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: true
}));

app.get("/", (req: Request, res: Response) => {
     return res.status(200).send({
          status : 200,
          msg    : `${process.env.APP_NAME}`
     })
})
app.use(Route);

app.listen(process.env.APP_PORT, () => {
     console.log(`${process.env.APP_NAME} Running on Port ${process.env.APP_PORT}`);
})