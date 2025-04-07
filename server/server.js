const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()


const app=express()

app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: "*", // Allow all origins or specify specific domains
  }));

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// mongoose.connect(process.env.MONGO_URI).then(()=>{
//     app.listen(5000,()=>{
//         console.log('listening..')
//     })
// }).catch(err=>{
//     console.log("error connecting")
//     console.log(err);
// })

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Export the Express app as a Vercel handler
    module.exports = app;
  })
  .catch(err => {
    console.log("Error connecting to MongoDB");
    console.log(err);
  });
