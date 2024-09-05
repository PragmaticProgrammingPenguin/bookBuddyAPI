const express = require("express")
const app = express()
require("dotenv").config()
const client = require("./db/client")
client.connect()
const PORT = 3000
//convert to json objects
app.use(express.json())

// /api ------------> send to /api/index.js
app.use("/api", require("./api"))

app.get("/", (req,res)=>{
    res.send("Hello from our server")
})

// app.use((error, req, res, next) => {
//     console.log("ERROR", error)
//     res.send({
//         message:"Something went wrong"
//     })
// })

app.use((err, req, res, next) => {
  res.status(500).send("Something broke...");
});

app.listen(PORT, ()=>{
    console.log(`Server live on port: ${PORT}
       * * * *
        *****
         \\o/`)
})
