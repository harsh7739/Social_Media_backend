const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    if(token){
        jwt.verify(token, "masai", (err, decoded)=> {
            if(decoded){
                console.log(decoded)
                req.body.userID=decoded.userID
                req.body.name=decoded.name
                next()
            }else{
                res.send("you are not authorised")
            }

          });
    }else{
        res.send("you are not authorised")
    }
}

module.exports={auth}