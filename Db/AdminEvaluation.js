import mongoose, {mongo} from 'mongoose'
const Schema = mongoose

const AdminEvaluation = new Schema({
    Evaluation_Link:{
        type: String,
        required: true
    },
    Semester:{
        type: String,
        required: true
    },
    Instructor:{
        type: String,
        required: true
    },
    College:{
        type: String,
        required: true
    },

    Deadline:{
      type: Date,
      required: true  
    }
});

const AdEvaluation = mongoose.model("Evaluation",AdminEvaluation);
export default AdEvaluation;