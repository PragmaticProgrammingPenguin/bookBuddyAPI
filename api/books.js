const express = require("express");
const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../db");

const { createReservation } = require("../db/reservations");
const { requireUser } = require("./utils");
// create a router object for the /books routes

const bookRouter = express.Router();

// {baseUrl}/api/books
bookRouter.get("/", async (req, res, next) => {
  try {
    const results = await getBooks();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

// {baseUrl}/api/books/:id
bookRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || req.params.id === " ") {
      next({
        name: "InvalidIDFormat",
        message: "The provided request parameter is not a valid book ID",
      });
      return;
    }
    const result = await getBook(id);
    if (!result) {
      next({ name: "Not Found", message: "No matching book found" });
      return;
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// {baseUrl}/api/books
bookRouter.post("/", requireUser, async (req, res) => {
  try {
    const result = await createBook(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

bookRouter.delete("/:id", requireUser, async (req, res) => {
  try {
    const result = await deleteBook(req.params.id);
    res.send({ message: "book deleted succesfully", id: result });
  } catch (err) {
    res.send(err);
  }
});

bookRouter.patch("/:id", requireUser, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || req.params.id === " ") {
      next({
        name: "InvalidIDFormat",
        message: "The provided request parameter is not a valid book ID.",
      });
      return;
    }
    const result = await getBook(id);
    if (!result) {
      next({ name: "Not Found", message: "no matching book found" });
      return;
    } else {
      const updated = await updateBook(req.params.id, req.body.available);
      if (updated) {
        await createReservation({ userId: req.user.id, booksId: updated.id });
        res.send({
          message: "updated successfully",
          updated,
        });
      } else {
        next({
          name: "UpdateError",
          message: "There was an error updating this book.",
        });
        return;
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = bookRouter;
