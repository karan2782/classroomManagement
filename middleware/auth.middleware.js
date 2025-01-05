const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
require('dotenv').config()

const auth = async (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(500).json({message:"Please login first"})
    }
    const token = req.headers.authorization.split(" ")[1]

    try {
        const decoded = jwt.decode(token, process.env.SECRET_KEY)
            
        const user = await User.findOne({_id:decoded.id})
        req.user = user 
        next()
        
    } catch (error) {
        return res.status(500).json({message:`Error : ${error}`})
    }
    
}

module.exports = auth