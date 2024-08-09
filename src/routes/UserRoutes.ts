import express from "express";
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
} from "../controller/user/BlogController";
import Uploads from "../middleware/UploadFile";

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

export default UserRoutes;
