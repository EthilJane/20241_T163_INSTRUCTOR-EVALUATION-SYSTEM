import mongoose, {mongo} from 'mongoose'
const Schema = mongoose

const AdminSchema = new Schema({
   name: {
      trype: String,
      required: true
   },
   UEmail:{
      type: String,
      required: true,
      unique: true,
      match:  /.+\@.+\..+/ 
   },
   EmloyeeID:{
      type: String,
      required: true,
      unique: true
   },
   officeType:{
      type: String,
      required: true
   }
});

const AdProfilemodel = mongoose.model ("Profile", AdminSchema);
export default AdProfilemodel; 