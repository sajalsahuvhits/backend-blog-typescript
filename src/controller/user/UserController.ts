import { Request, RequestHandler, Response } from "express";
import User, { UserInterface } from "../../model/UserModel";
import {
  comparePassword,
  encryptPassword,
  generateToken,
  handleErrorResponse,
  sendResponse,
} from "../../services/CommonService";
import { StatusCodes } from "http-status-codes";
import { ResponseMessage } from "../../utils/ResponseMessage";
import { CustomRequest } from "../../utils/Interface";
export const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return sendResponse(
      res,
      StatusCodes.BAD_REQUEST,
      ResponseMessage.REQUIRED_FIELD_MISSING,
      null
    );
  }
  try {
    let findUser = await User.findOne({ email });
    if (findUser) {
      return sendResponse(
        res,
        StatusCodes.CONFLICT,
        ResponseMessage.EMAIL_ALREADY_EXISTS,
        null
      );
    }
    let hashPassword = await encryptPassword(password);
    let userCreate = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return sendResponse(
      res,
      StatusCodes.CREATED,
      ResponseMessage.USER_CREATED,
      userCreate
    );
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(
      res,
      StatusCodes.BAD_REQUEST,
      ResponseMessage.REQUIRED_FIELD_MISSING,
      null
    );
  }
  try {
    let findUser = await User.findOne({ email });
    if (!findUser) {
      return sendResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        ResponseMessage.INVALID_CREDENTIALS,
        null
      );
    }
    let isValidPassword = await comparePassword(password, findUser.password);
    if (!isValidPassword) {
      return sendResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        ResponseMessage.INVALID_CREDENTIALS,
        null
      );
    }
    let token = generateToken({ id: findUser._id });
    return sendResponse(res, StatusCodes.OK, ResponseMessage.LOGIN_SUCCESS, {
      userInfo: findUser.toJSON(),
      token,
    });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateUserProfile: RequestHandler = async (req: CustomRequest, res ) => {
  const { username, linkedinUrl, facebookUrl, twitterUrl, designation, bio, mobile, dob } =
    req.body;
  const image = req.fileurl;
  const userId = req.user;

  if (!userId) {
    return sendResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      ResponseMessage.UNAUTHORIZED_ACCESS,
      null
    );
  }
  let data : Partial<UserInterface> = { username, linkedinUrl, facebookUrl, twitterUrl, designation, bio, mobile, dob }
  if(image){
    data.image = image;
  }
  try {
    let userUpdate = await User.findByIdAndUpdate( userId, data, { new: true } );
    return sendResponse(
      res,
      StatusCodes.OK,
      ResponseMessage.USER_UPDATED,
      userUpdate
    );
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
