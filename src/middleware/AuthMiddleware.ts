import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ResponseMessage } from "../utils/ResponseMessage";
import { sendResponse } from "../services/CommonService";
import User from "../model/UserModel";
import { CustomRequest } from "../utils/Interface";

interface DecodedProps {
    id: string;
}

export const Auth : RequestHandler = async (req: CustomRequest, res: Response, next) => {
    const BearerToken = req.headers.authorization;
    if (!BearerToken) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessage.TOKEN_NOT_AUTHORIZED, [])
    } else {
        try {
            let token = BearerToken.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as DecodedProps;
            if (decode && decode.id) {
                
                    const validUser = await User.findOne({
                        _id: decode.id,
                    });
                    if (validUser) {
                        req.user = decode.id;
                    } else {
                        return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessage.USER_NOT_AUTHORIZED, []);
                    }
                
            } else {
                throw new Error("Token not valid");
            }
            next();
        } catch (error) {
            return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessage.USER_NOT_AUTHORIZED, []);
        }
    }
}