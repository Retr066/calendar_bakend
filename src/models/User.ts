import { Schema, model, Document } from "mongoose";

interface UserProps extends Document {
  fullName: string;
  email: string;
  password: string;
}

const UserShema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<UserProps>("User", UserShema);
