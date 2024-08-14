const express = require("express")
const booksRouter = express.Router()

// {baseURL/api/books/}
booksRouter.get("/", (req,res)=>{
    res.send("Hello from /books")
})

module.exports = booksRouter