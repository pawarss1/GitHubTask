import { Schema } from 'mongoose';

// User Schema
const userSchema = new Schema({
  name: String,
  email: String,
  gitHubLink: String,
  company: String,
  followingCount: Number,
  followerCount: Number,
  bio: String,
  publicReposCount: Number,
});

export default userSchema;
