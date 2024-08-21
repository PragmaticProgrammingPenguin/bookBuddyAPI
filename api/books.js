const express = require("express")
const { getBooks, getBook } = require("../db/books")

const booksRouter = express.Router()

// {baseURL/api/books/}
booksRouter.get("/", async (req,res)=>{
    try{
        const results = await getBooks();
        res.send(results)
    }catch(err){
        res.send({ err, message: "something went wrong" })
    }
})

// {baseURL/api/books/:id}
booksRouter.get("/:id", async (req, res)=>{
    try {
        const { id } = req.params
        const result = await getBook(id)
        console.log(result)
        res.send(result)
    }catch (err){
        res.send({ err, message: "Something went wrong" })
    }
})

module.exports = booksRouter