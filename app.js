const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const AdminRoute = require("./Routes/AdminRoute")
app.use(AdminRoute);

const InstructorRoute = require("./Routes/InstructorRoute")
app.use(InstructorRouteRoute);

const StudentRoute = require("./Routes/StudentRoute")
app.use(StudentRouteRoute);

app.listen(3000, ()=>{
    console.log("Running on port 3000")
})