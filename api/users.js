const express = require("express")
const userRouter = express.Router()

// {baseURL}/users/me
userRouter.get("/me", (req,res)=>{
    res.send("Here is your account info")
})

// POST request to {baseURL/api/register}
userRouter.post("/register", (req,res)=>{
    console.log(req.body)
    res.send("User registered")
})

// POST request to {baseURL/api/login}
userRouter.post("/login", (req,res)=>{
    console.log(req.body)
    res.send("User logged in")
})

module.exports = userRouter