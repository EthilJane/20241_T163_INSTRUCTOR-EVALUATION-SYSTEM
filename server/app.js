import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

// app.listen(8000,() =>{
//     console.log('We can do this')
// })

// const app = express()

// app.listen(8000,() =>{
//     console.log('You Can DO It')
// })
// //routes
// import StudentRoute from './routes/StudentRoute.js'

// //API's
// app.use('/api/student', StudentRoute);

const port = process.env.PORT
//Establishing Connection
const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB)
    }catch(erroe){
        console.log(error);
    }
}

mongoose.connection.on('disconnected', ()=>{
    console.log('Disconnected from MongoDB')
})

mongoose.connection.on('Connected', ()=>{
    console.log('Connected from MongoDB');
})

app.listen(port, () => {
    connect();
    console.log('Connected to PORT ${port}');
})