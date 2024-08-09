import mongoose, { ObjectId } from "mongoose";

interface CommentsIntf{
  text: string;
  commentedBy: ObjectId;
  createdAt: Date;
}
export interface BlogInterface {
  title: string;
  content: string;
  image: string;
  userId: ObjectId;
  isDeleted: boolean;
  summary: string;
  likes: Array<ObjectId>;
  comments: Array<CommentsIntf>;
}

const blogSchema = new mongoose.Schema<BlogInterface>(
  {
    title: { type: String },
    content: { type: String },
    image: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    isDeleted: { type: Boolean, default: false },
    summary: { type: String },
    likes: [{type:mongoose.Schema.Types.ObjectId, ref: "users"}],
    comments: [{
      text: {type: String},
      commentedBy: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
      createdAt: {type: Date, default: Date.now}
    }]
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;
