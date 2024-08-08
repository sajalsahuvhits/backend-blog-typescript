import mongoose from "mongoose";
import * as dotenv from "dotenv"
dotenv.config();


export const connectDb = async () : Promise<void> => {
    try {
        const con = await mongoose.connect((process.env.DB_URL as string));
        console.log("Database connected...", con.connection.name)
    } catch (error) {
        console.log("Couldn't connect to database", (error as Error).message)
    }
}