const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { postRouter } = require("./routes/post.route")

const app = express()

app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)

app.listen(8080,async()=>{
    try {
        await connection
    console.log("Server is running...")
    } catch (error) {
        console.log(error)
    }
})
module.exports=app