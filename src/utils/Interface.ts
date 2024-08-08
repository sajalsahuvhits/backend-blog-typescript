import { Request } from "express";


export interface CustomRequest extends Request {
    user?: string;
    file?: Express.Multer.File;
    fileurl? : string;
}