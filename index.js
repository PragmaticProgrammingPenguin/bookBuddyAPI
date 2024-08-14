const express = require("express")
const app = express()

const PORT = 3000

//convert to json objects
app.use(express.json())

// /api ------------> send to /api/index.js
app.use("/api", require("./api"))

app.get("/", (req,res)=>{
    res.send("Hello from our server")
})

app.listen(PORT, ()=>{
    console.log(`IT LIIIIIIIIIIIIIIIIVES! (Server live on port: ${PORT})`)
})