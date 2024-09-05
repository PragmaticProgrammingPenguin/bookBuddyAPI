const express = require("express")
const reservationsRouter = express.Router()

const { requireUser } = require("./utils")

const {
    getReservation,
    deleteReservation,
    updateBook,
    getBook
} = require("../db")

reservationsRouter.get("/", (req, res) => {
    console.log("Hello from reservations")
})

reservationsRouter.delete("/:id", async (req, res, next) => {
    try{
        //first check if a reservation with that id exists
        const reservation = await getReservation(req.params.id)
        console.log("RESERVATION", reservation)

        //if not, throw an error with messsage - reservation does not exist
        if(!reservation){
            next({
                name: "reservationDoesNotExist",
                message:"Nothing to return here..."
            })
            return
        }else if(req.user.id !== reservation.userid){
            next({
                name:"permissionDenied",
                message:"You do not have permission to return this book"
            })
            return
        }else{
            //if reservation is there, check the reservation's userid against the logged-in user's id
            //-- if they don't match, throw an error -not authorized to return this book
            //-- if they DO match, two things - delete the reservation (using deleteReservation function) AND
            // update the book to be available again (set available:true)
            const deletedReservation = await deleteReservation(req.params.id)
            const book = await getBook(deletedReservation.bookId)
            if(deletedReservation){
                updateBook(book.id, true)
            }
            res.send(updatedBook)
        }
        res.send("Deleted")
    }catch(err){
        next(err)
    }
})

module.exports = reservationsRouter