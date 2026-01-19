const jwt=require("jsonwebtoken")
exports.verifyToken=(req,res)=>{

    const authHeader=req.headers.authorization
    const token=authHeader&&authHeader.split(" ")[1]
    console.log("AUTH HEADER:", req.headers.authorization);

    if(!token)return res.status(401)
        jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,user)=>{
    if(err)return res.status(403)
    req.user=user
next()
})
}