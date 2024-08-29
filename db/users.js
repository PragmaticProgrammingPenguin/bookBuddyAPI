const client = require("./client")
const bcrypt = require("bcrypt")
const SALT_COUNT = 10

const createUser = async({
    firstname = "Default",
    lastname = "Default",
    email,
    password
})=>{
    try{
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
        const SQL = `INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) ON CONFLICT(email) DO NOTHING RETURNING id, firstname, lastname, email`
        const { rows: [user], } = await client.query(SQL, [
            firstname || "firstname",
            lastname || "lastname",
            email,
            hashedPassword
        ])
        return user
    }catch(err){
        console.log(err)
    } 
}

// const getUserByEmail(email)
const getUserByEmail = async (email) => {
    try{
        const SQL = `SELECT * FROM users WHERE email=$1`
        const {
            rows:[result],
        } = await client.query(SQL, [email])
        return result
    }catch(err){
        console.log(err)
    }
}

const getUser = async ({ email, password })=>{
    try{
        const existingUser = await getUserByEmail(email)
        if(!existingUser) return
        const hashedPassword = existingUser.password
        const passwordMatch = await bcrypt.compare(password, hashedPassword)
        if(!passwordMatch) return
        delete existingUser.password
        return existingUser
    }catch(err){
        console.log(err)
    }
}

const getUserById = async (id) => {
    try{
        const SQL = `SELECT * FROM users WHERE id=$1`
        const {
            rows:[user]
        } = await client.query(SQL, [id])
        return user
    }catch(err){
        console.log(err)
    }
}

const getUsers = async () => {
    try{
        const SQL = `SELECT * FROM users`
        const { rows } = await client.query(SQL)
        return rows
    } catch(err){
        console.log(err)
    }
}

module.exports = { createUser, getUserByEmail, getUserById, getUsers, getUser }