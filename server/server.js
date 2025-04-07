// const express=require('express')
// const mongoose=require('mongoose')
// const cors=require('cors')
// require('dotenv').config()


// const app=express()

// app.use(express.json())
// // app.use(cors())
// app.use(cors({
//     origin: "*", // Allow all origins or specify specific domains
//   }));

// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))

// // mongoose.connect(process.env.MONGO_URI).then(()=>{
// //     app.listen(5000,()=>{
// //         console.log('listening..')
// //     })
// // }).catch(err=>{
// //     console.log("error connecting")
// //     console.log(err);
// // })

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     // Export the Express app as a Vercel handler
//     module.exports = app;
//   })
//   .catch(err => {
//     console.log("Error connecting to MongoDB");
//     console.log(err);
//   });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Connect to the database only once
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
  console.log("Connected to MongoDB");
}

// Export the Vercel handler function
module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    app(req, res);  // Forward to Express
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Internal server error");
  }
};
