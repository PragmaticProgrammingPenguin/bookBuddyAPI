const db = require("./client")

const createReservation = async ({ userId, booksId }) => {
    try{
        const SQL = `INSERT INTO reservations(userid, bookid) VALUES($1, $2) RETURNING  *`
        const { rows: [reservation], } = await db.query(SQL, [userId, booksId])
        return reservation

    }catch(err){
        throw err
    }
}


const getReservation = async ( id ) => {
    try{
        const SQL = `SELECT * FROM reservations WHERE id=$1`
        const { rows: [result], } = await db.query(SQL, [id])
        return result
    }catch(err){
        throw err
    }
}

const deleteReservation = async ( id ) => {
    try{
        const SQL = `DELETE FROM reservations WHERE id=$1 RETURNING  *`
        const { rows: [result], } = await db.query(SQL, [id])
        return result
    }catch(err){
        throw err
    }
}

module.exports = {createReservation, getReservation, deleteReservation}