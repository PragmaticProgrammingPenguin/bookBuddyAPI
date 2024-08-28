const express = require("express")

const userRouter = express.Router()
const { getUserById, getUserByEmail, getUsers, getUser, createUser } = require("../db/users")

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

// POST request to {baseURL/api/users/register}
userRouter.post("/register", async (req, res)=>{
    const {firstname, lastname, email, password} = req.body
    if(!email){
        res.send("Email not provided!")
        return
    }
    if(!password){
        res.send("Password not provided!")
        return
    }
    try{
        const existingUser = await getUserByEmail(email)
        if(existingUser){
            res.send("User already registered with that email")
            return
        }

        const result = await createUser(req.body)
        res.send("Success")
    }catch(err){
        res.send(err)
    }
})

// POST request to {baseURL/api/login}
userRouter.post("/login", async (req,res)=>{
    try{
        const result = await getUser(req.body.email)
        res.send("User logged in")
    }catch(err){
        res.send("something went wrong")
    }
})

userRouter.get("/test", async (req, res, next) => {
  try {
    //TODO(Typo) Check if this is supposed to be resjson()
    res.json();
  } catch (err) {
    next(err);
  }
})

module.exports = userRouter