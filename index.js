
const dotenv = require('dotenv').config()

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const tutorsRouter = require('./routes/tutorsRouter')
const studentsRouter = require('./routes/studentsRouter')
const authRoute = require("./routes/auth");
const authRoute2 = require("./routes/auth2");
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')




mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json()) 
app.use('/auth', authRoute)
app.use('/auth2', authRoute2)
app.use('/tutors', tutorsRouter)
app.use('/students', studentsRouter)

let port = process.env.PORT || 5000;



app.listen(port , ()=> console.log('Server Started')) 