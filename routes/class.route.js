const express = require('express')
const Class = require('../models/class.models')
const Student = require('../models/student.models')
const checkRole = require('../middleware/checkRole.middleware')

const classRouter = express.Router()

classRouter.use(express.json())

classRouter.post('/', checkRole, async (req, res)=>{
    const {name, subject, teacherName} = req.body
    
    const startDate = new Date().getDate()
    const endDate = new Date().getDate()
    try {
        const cls = new Class({
            name,
            subject,
            teacherName,
            startDate,
            endDate
        })
        await cls.save()
        res.status(201).json({message:"Class created successfully"})
    } catch (error) {
        res.status(500).json({message:`Error in create Class ${error}`})
    }
})

classRouter.get('/', async(req, res)=>{
    try {
        const classes = await Class.find()
        res.status(200).json({message:"See all classes", classes, user:req.user})
    } catch (error) {
        res.status(500).json({message:`Not getting classes ${error}`})
    }
})

classRouter.get('/:classId/students', async (req, res)=>{
    const {classId} = req.params 
    try {
        const students = await Student.find({classId:classId})
        res.status(200).json({students})
    } catch (error) {
        res.status(500).json({messsage:`Student not found ${error}`})
    }
})

module.exports = classRouter

