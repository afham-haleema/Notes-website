const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()

const app=express()
// app.use(cors())
app.use(cors({
    origin: "https://notes-website-qh1a.vercel.app", 
  }));
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(5000,()=>{
        console.log('listening..')
    })
}).catch(err=>{
    console.log("error connecting")
    console.log(err);
})




