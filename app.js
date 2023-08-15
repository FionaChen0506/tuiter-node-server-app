import "dotenv/config";
import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from './users/users-controller.js';
import TuitsController from './controllers/tuits/tuits-controller.js';
import session from "express-session";
import AuthController from './users/auth-controller.js';


import mongoose from "mongoose";
//mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);

const app = express();
//app.use(cors());
app.use(
    cors({
      credentials: true,
      //origin: ["http://localhost:3000", "https://a5--cheerful-blancmange-56884a.netlify.app/"] // use different front end URL in dev and in production
      //origin: process.env.FRONTEND_URL,
      origin: "http://localhost:3000",
    })
);
// const sessionOptions = { // configure server session after cors
//     secret: "any string", // this is a default session configuration that works fine locally, but needs to be tweaked further to work in a remote server such as AWS, Render, or Heroku. See later
//     resave: false,
//     saveUninitialized: false,
//   };
//   app.use(
//     session(sessionOptions)
// );

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


app.use(express.json());
const port = process.env.PORT || 4000;

TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
// app.use((req, res) => {
//     res.status(404).send('Not Found');
//   });

//app.listen(4000);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});