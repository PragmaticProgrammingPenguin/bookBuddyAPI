require("dotenv").config()
const client = require("./client")

const { createUser, getUserByEmail } = require("./users")
//create import books from ("./books")
const { createBook, getBookByTitle } = require("./books")

const users = [
    {
        firstname: "Alice",
        lastname: "Johnson",
        email:"alice@example.com",
        password: "alice123",
    },
    {
        firstname: "Bob",
        lastname: "Smith",
        email:"bob@example.com",
        password: "bob456",
    },
    {
        firstname: "Charlie",
        lastname: "Brown",
        email:"charlie@example.com",
        password: "charlie789",
    },
]

const books = [
    {
        title: "The Cat in The Hat",
        author: "Dr. Seuss",
        description: "Best book.",
        coverimage: 'https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png',
        available: "true"
    },
]


const insertUsers = async () => {
    try{
        for(const user of users){
            await createUser(user)
        }
    }catch(err){
        console.log(err)
    }
}

const insertBooks = async () => {
    try{
        for(const book of books){
            await createBook(book)
        }
    }catch(err){
        console.log(err)
    }
}

const dropTables = async () => {
    try{
        await client.query(`DROP TABLE IF EXISTS users;`)
        await client.query(`DROP TABLE IF EXISTS books;`)
    }catch(err){
        clgerr
    }
}

const createTables = async () => {
    try{
        await client.query(`CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                firstname VARCHAR(64),
                lastname VARCHAR(64),
                email VARCHAR(64) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )`)
        
            //Write another CREATE TABLE QUERY for books and run it here
            // id - primary key, title - vc255 NOT NULL, author varchar 128 NOT NULL, description  vc1024,
            // coverimage vc255 (coverImage VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/7034646/pexels-photo-7034646.jpeg')
            // available boolean DEFAULT true

        await client.query(`CREATE TABLE books(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(127) NOT NULL,
                description VARCHAR(1023),
                coverimage VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/7034646/pexels-photo-7034646.jpeg',
                available BOOLEAN DEFAULT TRUE
            )`)
    } catch (err) {
        console.log(err)
    }
}

const seedDatabase = async () => {
    try{
        client.connect()
        console.log("DROPPING TABLES...")
        await dropTables()
        console.log("Tables DROPPED")
        console.log("CREATING TABLES")
        await createTables()
        console.log("TABLES SUCCESSFULLY CREATED")
        console.log("INSERTING USERS...")
        await insertUsers()
        console.log("USERS ADDED SUCCESSFULLY")
        console.log("INSERTING BOOKS...")
        await insertBooks()
        console.log("BOOKS ADDED SUCCESSFULLY")
        await getUserByEmail("alice@example.com")
        await getBookByTitle("The Cat in The Hat")
    } catch(err){
        console.log(err)
    }finally{
        client.end()
    }
}

seedDatabase()