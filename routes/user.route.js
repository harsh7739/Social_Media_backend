const express=require("express")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
const {name,email,gender,password}=req.body
try {
    const user =await UserModel.findOne({email})
    if(user){
       res.status(200).send({"msg":"user already exist Please login..."})
    }else{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                res.status(200).send({"msg":"Password cannot hash"})
            }else{
                const user = new UserModel({name,email,gender,password:hash})
                await user.save()
                res.status(200).send({"msg":"Registration Successfull"})
            }
        });
    }
} catch (error) {
    res.status(400).send({"error":error})
}
})

userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body
try {
    const user = await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password, user.password, (err, result)=> {
           if(result){
                const token = jwt.sign({name:user.name,userID:user._id},"masai",{expiresIn:"7d"})
                res.status(200).send({"msg":"Login Successfull","token":token})
           }else{
            res.status(200).send({"msg":"Wrong Credential"})
           }
        });
    }else{
        res.status(200).send({"msg":"Signup first"})
    }
    
} catch (error) {
    res.status(400).send({"error":error})
}
})



module.exports={userRouter}