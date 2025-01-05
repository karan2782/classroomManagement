const checkRole = (req, res, next) =>{
    if(req.user.role==="teacher"){
        next()
    }else{
        res.status(401).json({message:"You are not authorized!"})
    }
}

module.exports = checkRole