import { postBlogController } from "./controller/user/BlogController";
import {
  loginUserController,
  registerUserController,
} from "./controller/user/UserController";
import { Auth } from "./middleware/AuthMiddleware";
import User from "./model/UserModel";
import {
  encryptPassword,
  sendResponse,
  comparePassword,
  generateToken,
  handleErrorResponse,
} from "./services/CommonService";
import { ResponseMessage } from "./utils/ResponseMessage";
import { StatusCodes } from "http-status-codes";

export default {
  StatusCodes,
  ResponseMessage,
  Auth,
  registerUserController,
  loginUserController,
  postBlogController,
  sendResponse,
  encryptPassword,
  comparePassword,
  generateToken,
  handleErrorResponse,
  User,
};
