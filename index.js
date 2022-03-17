require('dotenv').config()

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



app.use(express.json()) 
app.use('/auth', authRoute)
app.use('/auth2', authRoute2)
app.use('/tutors', tutorsRouter)
app.use('/students', studentsRouter)




app.listen(4000, ()=> console.log('Server Started')) 