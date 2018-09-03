import { Schema, model } from "mongoose";

const postSchema: Schema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  title: {
    type: String,
    default: "",
    required: true,
    maxlength: 255
  },
  content: {
    type: String,
    default: "",
    required: true
  },
  slug: {
    type: String,
    default: "",
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 255
  },
  featuredImage: {
    type: String,
    default: ""
  }
});

export default model("postModel", postSchema);
