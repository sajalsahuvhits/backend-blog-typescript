import express, { Response } from "express";

import {
  loginUserController,
  registerUserController,
  updateUserProfile,
} from "../controller/user/UserController";
import { Auth } from "../middleware/AuthMiddleware";
import {
  postBlogController,
  getAllBlogController,
  getMyBlogs,
  updateBlogController,
  getRecentBlogsController,
  deleteBlogController,
  likeBlogController,
  unlikeBlogController,
  addCommentController,
  getBlogById,
} from "../controller/user/BlogController";
import Uploads from "../middleware/UploadFile";
import { CustomRequest } from "../utils/Interface";
import { sendResponse } from "../services/CommonService";
import { StatusCodes } from "http-status-codes";

const UserRoutes = express.Router();

// #region user routes
UserRoutes.post("/register", registerUserController);
UserRoutes.post("/login", loginUserController);
UserRoutes.post("/update-profile",Auth, Uploads, updateUserProfile);


// #region blog routes
UserRoutes.post("/post-blog", Auth, Uploads, postBlogController);
UserRoutes.get("/get-all-blogs", Auth, getAllBlogController);
UserRoutes.get("/get-my-blogs", Auth, getMyBlogs);
UserRoutes.post("/update-blog", Auth, Uploads, updateBlogController);
UserRoutes.get("/get-recent-blogs", Auth, getRecentBlogsController);
UserRoutes.post("/delete-blog", Auth, deleteBlogController);
UserRoutes.post("/like-blog", Auth, likeBlogController);
UserRoutes.post("/unlike-blog", Auth, unlikeBlogController);
UserRoutes.post("/add-comment-to-blog", Auth, addCommentController);
UserRoutes.get("/get-blog/:id", Auth, getBlogById)
UserRoutes.post("/upload-image",  Uploads, (req : CustomRequest, res: Response) =>{
  if(req.fileurl){
    res.json({
      uploaded: 1,
      fileName: req.fileurl,
      url: `http://localhost:4001/api/uploads/${req.fileurl}`, // adjust the URL to match your server's file storage
    });
  }else{
    res.json({
      uploaded: 0,
      error: {
        message: 'File upload failed',
      },
    });
  }
});
export default UserRoutes;
