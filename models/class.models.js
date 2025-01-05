const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    teacherName:{
        type:String,
        required:true
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    }
})

const Class = mongoose.model("Class", ClassSchema)

module.exports = Class