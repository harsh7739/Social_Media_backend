const express = require("express")
const { PostModel } = require("../model/post.model")
const { auth } = require("../middleware/auth.middleware")

const postRouter = express.Router()
postRouter.use(auth)

postRouter.get("/",async(req,res)=>{
     const {device}=req.query
    try {
        if(device){
            const post = await PostModel.find({userID:req.body.userID,device})
            res.status(200).send(post)
        }
        const post = await PostModel.find({userID:req.body.userID})
        res.status(200).send(post)
        
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

postRouter.post("/add",async(req,res)=>{
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"A new post has been added"})
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const post = await PostModel.findOne({_id:id})
        if(req.body.userID==post.userID){
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"Post has been updated"})
        }else{
            res.status(200).send({"msg":"You are not authorised"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const post = await PostModel.findOne({_id:id})
        if(req.body.userID==post.userID){
            await PostModel.findByIdAndDelete({_id:id},req.body)
            res.status(200).send({"msg":"Post has been Deleted"})
        }else{
            res.status(200).send({"msg":"You are not authorised"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})


module.exports={postRouter}