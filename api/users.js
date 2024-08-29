const express = require("express")

const userRouter = express.Router()
const { getUserById, getUserByEmail, getUsers, getUser, createUser } = require("../db/users")

const jwt = require("jsonwebtoken")

userRouter.get("/", async (req,res,next)=>{
    try{
        const results = await getUsers()
        res.send(results)
    } catch (err) {
        next(err)
    }
})

// {baseURL}/users/:id
userRouter.get("/", async(req,res,next)=>{
    try{
        const { id } = req.params
        const result = await getUserById(id)
        res.send(result)
    }catch(err){
        next(err)
    }
})

// {baseURL}/users/me
userRouter.get("/me", (req,res)=>{
    res.send("Here is your account info")
})

// POST request to {baseURL/api/users/register}
userRouter.post("/register", async (req, res, next)=>{
    const {firstname, lastname, email, password} = req.body
    if(!email){
        next({name:"EmailRequiredError", message:"Email not provided"})
        return
    }
    if(!password){
        next({name:"PasswordRequiredError", message:"Password not provided"})
        return
    }
    try{
        const existingUser = await getUserByEmail(email)
        if(existingUser){
            next({name:"ExistingUserError", message:"User already registered with that email"})
            return
        }

        const result = await createUser(req.body)
        if (result) {
            //TODO(check) userRouter may be result
            const token = jwt.sign({id:userRouter.id, email}, process.env.JWT_SECRET,{expiresIn:"1w"})
            res.send({
                message:"Registration Successful!",
                token,
                user:{
                    id:result.id,
                    firstname:result.firstname,
                    lastname:result.lastname,
                    email:result.email
                }
            })
        } else {
            next({
                name: "RegistrationError",
                message: "error registering, try again later"
            })
            return
        }
        res.send("Success")
    }catch(err){
        next(err)
    }
})

// POST request to {baseURL/api/login}
userRouter.post("/login", async (req,res,next)=>{
    const { email, password } = req.body
    if (!email || !password){
        next({
            name: "MissingCredentialsError",
            message: "Please supply both an email and password",
        })
    }
    try{
        const result = await getUser(req.body)
        if(result){
            // create you token here and send with user id and email
            const token = jwt.sign({id:result.id, email}, process.env.JWT_SECRET,
                {expiresIn:"1w"})
                res.send({message:"Login Successful!", token})
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect",
            })
        }
    }catch(err){
        next(err)
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