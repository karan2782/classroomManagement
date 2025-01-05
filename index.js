const express = require("express")
const connection = require("./config/db")
const classRouter = require('./routes/class.route')
const studentRouter = require('./routes/student.route')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use('/api/classes', classRouter)
app.use('/api/students', studentRouter)


app.get('/', (req, res)=>{
    res.send("hello runnign app")
})

app.listen(3000, async ()=>{
    try {
        await connection
        console.log(`Server is running of http:/localhost:3000 and connected to database`)
    } catch (error) {
        console.log(`It is error during connection: ${error}`);
        
    }
})

