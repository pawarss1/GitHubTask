import { Schema, model } from 'mongoose';

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

// Creating User Collection.
const Users = model('Users', userSchema);

export default Users;
