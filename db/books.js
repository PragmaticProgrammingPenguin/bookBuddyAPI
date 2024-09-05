const client = require("./client")

const getBooks = async () => {
    try{
        const SQL =`SELECT * FROM books`
        const { rows } = await client.query(SQL)
        if(!rows) return {message: "Something went wrong, no results"}
        return rows
    }catch (err){
        console.log(err)
    }
}

const getBookByTitle = async (title) => {
    try{
        const SQL = `SELECT * FROM books WHERE title=$1`
        const {
            rows:[result],
        } = await client.query(SQL, [title])
        return result
    }catch(err){
        console.log(err)
    }
}

const getBook = async(id)=>{
    try{
        const SQL = `SELECT * FROM books WHERE id=$1`
        const { rows: [book], } = await client.query(SQL, [id])
        return book
    }catch(err){
        console.log(err)
    }
}

const deleteBook = async(id)=>{
    try{
        const SQL = `DELETE FROM books WHERE id=$1 RETURNING *`
        const { rows: [result], } = await client.query(SQL, [id])
        return result
    }catch(err){
        console.log(err)
    }
}

const createBook = async({
    title,
    author,
    description,
    coverimage,
    available
}) => {
    try{
        const SQL = `INSERT INTO books(
        title,
        author,
        description,
        coverimage,
        available) VALUES($1, $2, $3, $4, $5) RETURNING *`
        const { rows: [book], } = await client.query(SQL, [
            title,
            author,
            description,
            coverimage || "https://images.pexels.com/photos/7034646.jpeg",
            available || true])
        return book
    }catch(err){
        console.log(err)
    }
}

const updateBook = async (id,available) => {
    try{
        const SQL = `UPDATE books SET available=$1 WHERE id=$2 RETURNING *`
        const { rows: [book] } = await client.query(SQL, [available, id])
        return book
    }catch(err){
        console.log(err)
    }
}


module.exports = { createBook, getBookByTitle, getBooks, getBook, deleteBook, updateBook}