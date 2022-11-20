const express = require('express')
const app = express()
const cors = require('cors');
const db = require('../config/database')

const karyawan = db.collection("karyawan")
const port = 8000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", async (req,res) =>{
    const Snapshot = await karyawan.get()
    console.log(Snapshot)
})

app.listen(process.env.port || port, ()=>{
    console.log("App listening to port 8000")
})

app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.get("/api/karyawan", (req, res) => {
    try{
        let karyawans = []
        karyawan.get().then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                let id = doc.id
                karyawans.push({ id, ...doc.data()})
            })
            res.send(karyawans)
        })
    }
    catch(err){
        console.log(err)
    }
})

app.post("/api/post", async (req,res) =>{
    try{
        karyawan.add({
            nama:req.body.nama,
            email:req.body.email,
            tempat_lahir:req.body.tempat_lahir
        })
        res.send({
            status:true,
            message:"Data added succesfully"
        })
    }
    catch(err){
        console.log("Error : ", err);
    }
})


app.delete("/api/karyawan/:id", (req, res) => {
    const {id} = req.params
 
    try{
        karyawan.doc(id).delete().then(()=>{
            res.send({
                message: "Data succesfully deleted"
            })
        })
    }
    catch(err){
        console.log(err)
    }
})

app.put("/api/karyawan/:id", (req, res) =>{
    const {id} = req.params
    console.log(req.body)
    try{
        karyawan.doc(id).update({
            nama:req.body.nama,
            email:req.body.email,
            tempat_lahir:req.body.tempat_lahir
        })
        .then(() => {
            res.send({
                message:"Data succesfully updated "
            })
        })
    }
    catch(error){
        console.log(error)
    }
})