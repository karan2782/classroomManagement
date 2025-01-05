const express = require('express')
const Student = require('../models/student.models')

const studentRouter = express.Router()

studentRouter.use(express.json())

studentRouter.post("/", async (req, res)=>{
    const {firstName, lastName, email, classId} = req.body

    try {
        const student = new Student({
            firstName, 
            lastName,
            email,
            classId
        })
        await student.save()

        res.status(201).json({message:"Student is created successfully"})
    } catch (error) {
        res.status(500).json({message:`Error in created a student: ${error}`})
    }
    
})


module.exports = studentRouter