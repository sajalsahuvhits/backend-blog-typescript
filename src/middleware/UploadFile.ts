import { Request, Response, RequestHandler, NextFunction } from "express";
import multer from "multer";
import { CustomRequest } from "../utils/Interface";
import { Express } from "express";
const storage = multer.diskStorage({
  destination: (request : Request, file : Express.Multer.File, callback) => {
    callback(null, "./public/uploads");
  },
  filename: (request : Request, file : Express.Multer.File, callback) => {
    var [_, ext] = file.originalname.split(".");
    callback(null, Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage }).fields([
  {
    name: "upload",
    maxCount: 1,
  },
  {
    name: "image",
    maxCount: 1,
  },
]);;

const Uploads = (req : CustomRequest, res : Response, next : NextFunction) => {
  upload(req, res, async (err: unknown) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      if (req.files) {
        // if (
        //   !req.file.originalname.match(/\.(pdf|jpg|JPG|jpeg|JPEG|png|PNG|svg|avif)$/)
        // ) {
        //   return res.status(400).send({
        //     status: 400,
        //     message: "Only allowd pdf|jpg|JPG|jpeg|JPEG|png|PNG|svg",
        //   });
        // } else {
          let ckeditorImg = 'upload' in req.files ? req.files.upload[0].filename : "";
          let image = 'image' in req.files ? req.files.image[0].filename : "";
          // req.profileUrl = profile;
          // var path = req.file.filename;
          // path = `${path}`;
          req.fileurl = ckeditorImg || image;
          next();
        // }
      } else {
        req.fileurl = "";
        next();
      }
    }
  });
}
export default Uploads;
