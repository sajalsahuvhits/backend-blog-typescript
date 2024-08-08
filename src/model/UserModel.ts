import mongoose from "mongoose";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  linkedinUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  designation: string;
  image: string;
  mobile: string;
  bio: string;
  dob: Date;
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    linkedinUrl: { type: String },
    facebookUrl: { type: String },
    twitterUrl: { type: String },
    designation: { type: String },
    image: { type: String },
    mobile: { type: String },
    bio: { type: String },
    dob: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
export default User;
