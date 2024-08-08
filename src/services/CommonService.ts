import { Response } from "express";
import bcryptjs from "bcryptjs"
import { StatusCodes } from "http-status-codes";
import { ResponseMessage } from "../utils/ResponseMessage";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const encryptPassword = async (password: string) : Promise<string> => {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    return hashPassword;
}

export const comparePassword = async (plainPassword: string, hashedPassword: string) : Promise<boolean> => {
    return await bcryptjs.compare(plainPassword, hashedPassword);
}

export const handleErrorResponse = async (res : Response, error: any) : Promise<Response> => {
    return res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message,
    });
  };
  
export const sendResponse = async (res: Response, status : number, message: string, data: any) : Promise<Response> => {
    return res.status(status).json({ status, message, data });
};

export const generateToken = (payload: any) : string => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY as string);
};