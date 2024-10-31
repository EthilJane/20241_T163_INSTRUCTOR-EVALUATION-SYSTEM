import mongoose, {mongo} from 'mongoose'
const Schema = mongoose

const FirstpageSchema = new Schema ({
    Rating_period: {
        type: Number,
        requred: true
    },
    Semester:{
        type: Number,
        required: true
    },
    SChool_year:{
        type: Number,
        required: true
    },
    Name_of_Faculty:{
        type: String,
        required: true
    },
    Subject:{
        type: String,
        required: true
    },
    College:{
        type: String,
        required: true
    },
    Room:{
        type: String,
        required: true
    }
});

const StudentModel1= mongoose.model("firstpage", FirstpageSchema);
export default StudentModel1;