const express = require("express")
const { getBooks, getBook, createBook, deleteBook, updateBook } = require("../db/books")

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
        res.send(result)
    }catch (err){
        res.send({ err, message: "Something went wrong" })
    }
})

// {baseURL/api/books}
booksRouter.post("/", async (req,res)=>{
    try{
        const result = await createBook()
        res.send(result)
    }catch(err){
        res.send(err)
    }
})

// {baseURL/api/books/delete/:id}
booksRouter.delete("/:id", async (req,res)=>{
    try{
        const result = await deleteBook(req.params.id)
        res.send({ message: "book deleted successfully", id: result })
    }catch(err){
        res.send(err)
    }
})

// Update book
booksRouter.patch("/:id", async (req,res)=>{
    try{
        const result = await updateBook(req.params.id, req.body.available)
        res.send({ message:"Book updated succesfully", result })
    }catch(err){
        res.send(err)
    }
})

module.exports = booksRouter