const express = require("express")

const userRouter = express.Router()
const getUserById = require("../db/users")
const getUsers = require("../db/users")

userRouter.get("/", async (req,res)=>{
    try{
        const results = await getUsers()
        res.send(results)
    } catch (err) {
        res.send({err, message:"Something went wrong"})
    }
})

// {baseURL}/users/:id
userRouter.get("/", async(req,res)=>{
    try{
        const { id } = req.params
        const result = await getUserById(id)
        res.send(result)
    }catch(err){
        res.send({err, message:"Something went wrong"})
    }
})

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