import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
    
 const register = (req, res) => { 
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      //console.log("Username already exists.")
      res.sendStatus(409).send({error: "Username already exists."});
      return;
    }
    // const newUser = usersDao.createUser(req.body);
    const newUser = {   _id: new Date().getTime() + "", firstName:req.body.firstName, lastName:req.body.lastName, username:req.body.username, password:req.body.password  }
    usersDao.createUser(newUser);
    //currentUserVaribale = newUser;
    req.session["currentUser"] = newUser;
    console.log(newUser)
    res.json(newUser);
    //console.log("User registered")
 };

 const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
      //console.log("User logged in.")
    } else {
      res.sendStatus(404).send("User doesn't exist");
      //res.status(404).json({ error: "User doesn't exist" });
      //console.log("User doesn't exist")
    }
  };
 
  const profile  = (req, res) => { 
    //console.log("profile function called")
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
    console.log("current user", currentUser)
 };

 const logout  = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

 const update = (req, res) => {
    const username = req.body.username;
    const currentUser = usersDao.findUserByUsername(username);

    const updates = req.body;
    const updateResult = usersDao.updateUser(currentUser._id, updates);
    if (updateResult && updateResult.status === 'ok') {
      // Update the current user in the session
      req.session["currentUser"] = { ...currentUser, ...updates };
      const updatedUser = { ...updates };
      res.status(200).json({ user: updatedUser });
      //console.log("User updated", updatedUser);
    } else {
      res.sendStatus(404);
    }
   };

 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 //app.put ("/api/users/:uid",     update);
 app.put ("/api/users",     update);
};
export default AuthController;