import express from "express";
import * as dotenv from "dotenv"
import { connectDb } from "./src/config/Db.config";
import UserRoutes from "./src/routes/UserRoutes";
import cors from 'cors'
dotenv.config();
const app = express();
const PORT : number = Number(process.env.PORT) || 4000;
app.use(express.json())
app.use(cors({origin: "*"}))
app.use("/api/uploads", express.static("./public/uploads"))
app.use("/api/user", UserRoutes)
app.listen(PORT, () : void => {
    connectDb();
    console.log("Server running on port: ", PORT);
    
})