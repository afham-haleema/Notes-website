const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()
MONGO_URI="mongodb+srv://afham:afham1234@nodetuts.opiyiwf.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts"


const app=express()

app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: "*", // Allow all origins or specify specific domains
  }));

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

mongoose.connect(MONGO_URI).then(()=>{
    app.listen(5000,()=>{
        console.log('listening..')
    })
}).catch(err=>{
    console.log("error connecting")
    console.log(err);
})




