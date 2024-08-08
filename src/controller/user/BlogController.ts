import { RequestHandler } from "express";
import { handleErrorResponse, sendResponse } from "../../services/CommonService";
import { StatusCodes } from "http-status-codes";
import { ResponseMessage } from "../../utils/ResponseMessage";
import { CustomRequest } from "../../utils/Interface";
import Blog, { BlogInterface } from "../../model/BlogModel";


export const postBlogController : RequestHandler = async (req: CustomRequest, res) => {
    const {title, content, summary} = req.body;
    const userId = req.user;
    if(!title || !content){
        return sendResponse(res, StatusCodes.BAD_REQUEST, ResponseMessage.REQUIRED_FIELD_MISSING, {})
    }
    try {
        const blogSave = await Blog.create({title, content, userId, image: req.fileurl, summary})
        return sendResponse(res, StatusCodes.CREATED, ResponseMessage.BLOG_CREATED, blogSave)
    } catch (error) {
        return handleErrorResponse(res, error)
    }
}


export const getAllBlogController : RequestHandler = async (req: CustomRequest, res) => {
    try {
        const userId = req.query.userid;
        let filterBy = userId ? {userId} : {}
        const blogData = await Blog.find(filterBy).populate('userId', '-password').sort({_id: -1});
        return sendResponse(res, StatusCodes.OK, ResponseMessage.BLOGS_FETCHED, blogData);
    } catch (error) {
        return handleErrorResponse(res, error)
    }
}

export const getMyBlogs : RequestHandler = async (req: CustomRequest, res) => {
    try {
        const blogData = await Blog.find({userId: req.user}).populate('userId', '-password').sort({_id: -1})
        return sendResponse(res, StatusCodes.OK, ResponseMessage.BLOGS_FETCHED, blogData)
    } catch (error) {
        return handleErrorResponse(res, error);
    }
}

export const updateBlogController : RequestHandler = async (req: CustomRequest, res) => {
    const {title, content, blogId, summary} = req.body;
    if(!title || !content || !summary){
        return sendResponse(res, StatusCodes.BAD_REQUEST, ResponseMessage.REQUIRED_FIELD_MISSING, {})
    }
    try {
        let data : Partial<BlogInterface> = {title, content, summary};
        if (req.fileurl) {
            data.image = req.fileurl;
        }
        const blogUpdate = await Blog.findByIdAndUpdate(blogId, data, {new: true}).populate('userId', 'username')
        return sendResponse(res, StatusCodes.OK, ResponseMessage.BLOG_UPDATED, blogUpdate)
    } catch (error) {
        return handleErrorResponse(res, error)
    }
}
export const getRecentBlogsController : RequestHandler = async (req: CustomRequest, res) => {
    try {
        const userId = req.user;
        const today = new Date();
        const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  
        const blogData = await Blog.find({
            createdAt: {
                $gte: twoDaysAgo,
                $lt: today
            },
            userId: {$ne: userId}
        })
        .populate('userId', '-password')
        .sort({_id: -1});
  
        return sendResponse(res, StatusCodes.OK, ResponseMessage.BLOGS_FETCHED, blogData);
    } catch (error) {
        return handleErrorResponse(res, error)
    }
  }

export const deleteBlogController : RequestHandler = async (req: CustomRequest, res) => {
    try {
        const {blogId} = req.body
        console.log(blogId)
        const blogDelete = await Blog.findByIdAndDelete(blogId);
        if (!blogDelete) {
            return sendResponse(res, StatusCodes.NOT_FOUND, ResponseMessage.BLOG_NOT_FOUND, {});
        }
        return sendResponse(res, StatusCodes.OK, ResponseMessage.BLOG_DELETED, {});
    } catch (error) {
        return handleErrorResponse(res, error)
    }
}