const ROLES = {
    "EMPLOYE" : "EMPLOYE" ,
    "ADMIN" : "ADMIN"
}

const isRole = (...roles)=>(req , res , next)=>{
    const role = roles.find(role=> req.user.role === role)
    if(!role){
        return res.status(401).json({message : "No access !"})
    }

    next()
    
}

module.exports = {ROLES , isRole}