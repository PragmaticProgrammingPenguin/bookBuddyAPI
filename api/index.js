const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");

apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");
  const prefix = "Bearer ";
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
      const id = parsedToken && parsedToken.id;

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (err) {
      next(err);
    }
  } else {
    next({
      name: "AuthorizationHeaderErrr",
      message: "Authorization token must start with 'Bearer '",
    });
  }
});

// register routes for requests that have form {baseUrl}/api/books
apiRouter.use("/books", require("./books"));

// registers routes for requests of form {baseUrl}/api/users
apiRouter.use("/users", require("./users"));

// registers routes for requests of form {baseUrl}/api/reservations
apiRouter.use("/reservations", require("./reservations"));

// baseurl/api
apiRouter.get("/", (req, res) => {
  res.send("Hello from /api");
});

module.exports = apiRouter;
