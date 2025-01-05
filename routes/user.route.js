const express = require('express')
const User = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userRouter = express.Router()

userRouter.post('/register', async (req, res)=>{
    const {name, email, password, role} = req.body

    try {
        bcrypt.hash(password, 3, async (err, hash)=>{
            if(err){
                return res.send("Some error in hashing password")
            }

            const user = new User({name, email, password:hash, role})
            await user.save()

            res.status(201).json({message:"User created successfully"})
        })
    } catch (error) {
        res.status(500).json({message:`Error in creating user ${error}`})
    }
})


userRouter.post('/login', async(req, res)=>{
    const {email, password} = req.body 
    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(500).json({message:"User not found"})
        }
    
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                return res.status(500).json({message:'Invalid Password'})
            }

            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY)
            return res.status(200).json({message:"User login successfully", token})
        })
    } catch (error) {
        res.status(500).json({message:`Error in login ${error}`})
    }
})


module.exports = userRouter