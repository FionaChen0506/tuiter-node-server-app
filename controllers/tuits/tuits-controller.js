//import posts from "./tuits.js";
//let tuits = posts;
import * as tuitsDao from './tuits-dao.js'

const createTuit = async (req, res) => {
    const newTuit = req.body;
    //newTuit._id = (new Date()).getTime() + '';
    newTuit.username = "Gwen Stacy";
    newTuit.handle = "@hereisgwen",
    newTuit.likes = 0;
    newTuit.dislikes = 0;
    newTuit.liked = false;
    newTuit.disliked = false;
    newTuit.time = "1 min",
    newTuit.image = "tuit-image5.jpg",
    newTuit.title = "Untitled";
    newTuit.retuits = 0;
    newTuit.replies = 0;
    //tuits.push(newTuit);
    const insertedTuit = await tuitsDao.createTuit(newTuit); // actual tuit inserted in database with DAO's createTuit
    res.json(insertedTuit);
}

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
 }
 
const updateTuit = async (req, res) => {  
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    //const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
    //tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
    res.json(status);
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete); //success or failure status deleting record from database
    //tuits = tuits.filter((t) =>  t._id !== tuitdIdToDelete);
    //res.sendStatus(200);
    res.json(status);
}

const TuitsController = (app) =>{
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}


// // Fallback route for handling unmatched routes
// app.use((req, res) => {
//     res.status(404).send('Not Found');
//   });
  
//   app.listen(4000, () => {
//     console.log('Server is running on port 4000');
//   });
export default TuitsController;