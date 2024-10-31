import mongoose, {mongo} from 'mongoose'
const Schema = mongoose

const Adminlogin = new Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const adminlogin = mongoose.model("Evaluation",Adminlogin);
export default adminlogin;