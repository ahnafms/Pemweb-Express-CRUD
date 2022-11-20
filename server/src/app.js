const express = require('express')
const app = express()
const cors = require('cors');
const port = 8000

app.use(cors())

app.get("/", (req,res) =>{
    res.sendFile()
})
app.listen(process.env.port || port, ()=>{
    console.log("App listening to port 8000")
})

app.get("/get", (req,res)=>{
    res.send("Hello World")
})