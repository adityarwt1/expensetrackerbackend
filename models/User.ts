import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  image: string;
  fullname: string;
  email: string;
  password: string;
}

const UserSchema: Schema<User> = new Schema(
  {
    image: {
      type: String,
    },
    fullname: {
      type: String,
      required: [true, "Please provide the fullname"],
    },
    email: {
      type: String,
      required: [true, "Please provide the the email address"],
    },
    password: {
      type: String,
      required: [true, "Please provide the passoword"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default User;
