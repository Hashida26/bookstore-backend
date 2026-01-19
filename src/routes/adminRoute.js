const express=require("express")
const{getAllUsers}=require("../controllers/adminController")
const { verifyToken } = require("../middlewares/authMiddleware")
const verifyRole = require("../middlewares/verifyRole")
const route=express.Router()

route.get('/users',
    verifyToken,
    verifyRole("admin"),
    
    getAllUsers)
module.exports=route