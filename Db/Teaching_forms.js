import mongoose, {mongo} from 'mongoose'
const Schema = mongoose

const Teaching_loads = new Schema ({
        Employee_ID:{
            type: Number,
            required: true
        },
        Office_type:{
            type: String,
            required: true
        },
        College:{
            type: String,
            required: true
        },
        Select_Department:{
            type: String,
            required: true
        },
        Subject_code:{
            type: String,
            required: true,
            unique: true
        },
        Subject_title:{
            type: String,
            required: true
        },
        Total_of_STudent:{
            type: Number,
            required: true
        }
});
const FAculty_Tech_form = mongoose.model("teaching_loads",Teaching_loads);
export default FAculty_Tech_form;