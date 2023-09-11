const express = require('express')
const { connection } = require('./config/db')
const app = express()
const cors = require('cors')
const { classifiedRouter } = require('./routes/classified.route')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("base endpoint")
})

app.use('/classified',classifiedRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        .then(res=>console.log("Connection successfull"))
    }catch(error){
        console.log("Connection unsucessfull")
        console.log(error)
    }
})