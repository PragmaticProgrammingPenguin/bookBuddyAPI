// TODO(Books) Create a function createBook(){
/* author,
    description,
    coverImage,
    available,})
*/
const client = require("./client")

const createBook = async({
    title, author, description, coverimage, available
}) => {
    try{
        const SQL = `INSERT INTO books(title, author, description, coverimage, available) VALUES($1, $2, $3, $4, $5) RETURNING title, author, description, coverimage, available`
        const { rows: [book], } = await client.query(SQL, [title, author, description, coverimage, available])
        return book
    }catch(err){
        console.log(err)
    }
}

const getBookByTitle = async (title) => {
    try{
        const SQL = `SELECT * FROM books WHERE title=$1`
        const {
            rows:[result],
        } = await client.query(SQL, [title])
        console.log(result)
        return result
    }catch(err){
        console.log(err)
    }
}

module.exports = { createBook, getBookByTitle }