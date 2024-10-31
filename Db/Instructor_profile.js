import mongoose, {mongo} from 'mongoose'
const Schema = mongoose

const InstructorSchema = new Schema({
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
      type: Number,
      required: true,
      unique: true
   },
   officeType:{
      type: String,
      required: true
   }
});

const InsProfile = mongoose.model ("instructor_profile", InstructorSchema);
export default InsProfile; 