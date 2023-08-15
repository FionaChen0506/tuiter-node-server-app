import mongoose from 'mongoose';
import tuitsSchema from './tuits-schema.js'

const tuitsModel = mongoose.model('TuitModel', tuitsSchema);// create mongoose model from the schema
export default tuitsModel;