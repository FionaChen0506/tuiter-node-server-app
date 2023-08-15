import mongoose from 'mongoose';
const schema = mongoose.Schema({ // create the schema
  tuit: String, // tuit property of type String
  username: String,
  likes: Number,
  liked: Boolean,
  dislikes: Number,
  disliked: Boolean,
  handle: String,
  image: String,
  time: String,
}, {collection: 'tuits'}); // collection name where tuits are stored in tuiter database
export default schema;