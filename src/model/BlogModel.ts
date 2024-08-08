import mongoose, { ObjectId } from "mongoose";

export interface BlogInterface {
  title: string;
  content: string;
  image: string;
  userId: ObjectId;
  isDeleted: boolean;
  summary: string;
}

const blogSchema = new mongoose.Schema<BlogInterface>(
  {
    title: { type: String },
    content: { type: String },
    image: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    isDeleted: { type: Boolean, default: false },
    summary: { type: String }
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;
