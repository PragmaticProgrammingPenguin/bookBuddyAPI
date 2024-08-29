const express = require("express")
const { getBooks, getBook, createBook, deleteBook, updateBook } = require("../db/books")

const booksRouter = express.Router()

// {baseURL/api/books/}
booksRouter.get("/", async (req, res, next)=>{
    try{
        const results = await getBooks();
        res.send(results)
    }catch(err){
        next(err)
    }
})

// {baseURL/api/books/:id}
booksRouter.get("/:id", async (req, res, next)=>{
    try {
        const id = Number(req.params.id)
        if(isNaN(id) || req.param.id ===""){
            next({
                name:"Invalid ID Format",
                message:"The provided request parameter is not a valid book ID"
            })
            return
        }
        const result = await getBook(id)
        if(!result){
            next({name:"Not Found", message:"No matching book found"})
        }
        res.send(result)
    }catch (err){
        next(err)
    }
})

// {baseURL/api/books}
booksRouter.post("/", async (req,res,next)=>{
    try{
        const result = await createBook()
        res.send(result)
    }catch(err){
        next(err)
    }
})

// {baseURL/api/books/delete/:id}
booksRouter.delete("/:id", async (req,res,next)=>{
    try{
        const result = await deleteBook(req.params.id)
        res.send({ message: "book deleted successfully", id: result })
    }catch(err){
        next(err)
    }
})

// Update book
booksRouter.patch("/:id", async (req,res,next)=>{
    try{
        const id = Number(req.params.id)
        if(isNaN(id) ||  req.params.id===""){
            next({
                name: "InvalidIDFormat",
                message: "Parameter is not a valid book ID"
            })
            return
        }
        const result = await getBook(id)
        if(!result){
            next({name:"Not Found", message:"No matching book found"})
            return
        }else{
            const updated = await updateBook(req.params.id, req.body.available)
            if(updated){
                res.send({
                    message: "updated successfully",
                    updated,
                })
            }else{
                next({
                    name:"UpdateError",
                    message: "There was an error updating this book",
                })
                return
            }
        }
    }catch(err){
        next(err)
    }
})

module.exports = booksRouter