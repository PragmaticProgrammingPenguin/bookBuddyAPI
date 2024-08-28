const express = require("express")

const userRouter = express.Router()
const { getUserById, getUserByEmail, getUsers, getUser, createUser } = require("../db/users")

const jwt = require("jsonwebtoken")

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
        if (result) {
            //TODO(check) userRouter may be result
            const token = jwt.sign({id:userRouter.id, email}, process.env.JWT_SECRET,{expiresIn:"1w"})
            res.send({message:"Registration Successful!", token, user:{
                    id:result.id,
                    firstname:result.firstname,
                    lastname:result.lastname,
                    email:result.email
                }
            })
        } else {
            res.send("error registering, try later")
            return
        }
        res.send("Success")
    }catch(err){
        res.send(err)
    }
})

// POST request to {baseURL/api/login}
userRouter.post("/login", async (req,res)=>{
    const { email, password } = req.body
    if (!email || !password){
        res.send("Missing credentials, must supply email and/or password")
    }
    try{
        const result = await getUser(req.body.email)
        if(result){
            // create you token here and send with user id and email
            const token = jwt.sign({id:result.id, email}, process.env.JWT_SECRET,
                {expiresIn:"1w"})
                res.send({message:"Login Successful!", token})
        } else {
            res.send("incorrect credentials")
        }
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