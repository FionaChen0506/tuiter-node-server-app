import people from './users.js';
let users = people
const UserController = (app) => {  // use express instance app to declare HTTP GET
    app.get('/api/users', findUsers); // request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserById); // map path pattern to handler function
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}
const findUsers = (req, res) => {   // function runs when /api/users requested
    const type = req.query.type  // retrieve type parameter from query
    if(type) { // if type parameter in query
      const usersOfType = users.filter(u => u.type === type)  // find users of that type
      res.json(usersOfType)
      return
    }
    res.json(users)  // responds with JSON array of users
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user);
}

const createUser = (req, res) => {
    const newUser = req.body; // extract new user from BODY in request
    newUser._id = (new Date()).getTime() + ''; // add an _id property with unique timestamp
    users.push(newUser); // append new user to users array
    res.json(newUser); // respond with new user to client
}

const deleteUser = (req, res) => {
    const userId = req.params['uid']; // get user ID from path parameter uid filter out the user
    users = users.filter(usr => usr._id !== userId); // whose ID is the ID of the user we want to remove
    res.sendStatus(200);
}

const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    users = users.map((usr) =>
      usr._id === userId ?
        {...usr, ...updates} :
        usr
    );
    res.sendStatus(200);
}


export default UserController;

