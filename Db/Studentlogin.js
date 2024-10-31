import mongoose, {mongo} from 'mongoose'
const Schema = mongoose

const StudentSchema = new Schema({
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        confirmation:{
            type: String,
            required: true
        }
});

const Student_login = mongoose.model ("student_login", StudentSchema);
export default Student_login;