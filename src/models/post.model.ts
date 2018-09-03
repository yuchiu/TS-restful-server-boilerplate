import { Schema, model } from "mongoose";

const postSchema: Schema = new Schema({
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
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default model("Post", postSchema);
