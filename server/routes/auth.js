// const express=require('express')
// const bcrypt=require('bcryptjs')
// const JWT_SECRET='e+qy6fQTrQxh/DRtZ0q9ZXkzC2CJpe3oVvNxv/iGHrU='
// const jwt=require('jsonwebtoken')
// const User=require('../models/User')
// const router=express.Router();

// //register a new user

// router.post('/register',async (req,res)=>{
//     const {username, password}=req.body;
//     const existinguser=await User.findOne({username}) 
//     if(existinguser) return res.json({message:'User exists'})
//     const hashedpassword=await bcrypt.hash(password,10)
//     const user=new User({username,password:hashedpassword})
//     await user.save()
//     res.json({message:"user registered"})
// })

// //loggin in

// router.post('/login',async (req,res)=>{
//     const {username, password}=req.body
//     const user=await User.findOne({username})
    
//     if(!user || !(await bcrypt.compare(password,user.password))){
//         return res.status(401).json({message:"Invalid credentials"})
//     }
//     const token=jwt.sign({userId:user._id},JWT_SECRET)
//     return res.json({token, username:user.username})
// })

// module.exports=router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = 'e+qy6fQTrQxh/DRtZ0q/9ZXkzC2CJpe3oVvNxv/iGHrU=';

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    
    if (existingUser) {
        return res.json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
});

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token, username: user.username });
});

module.exports = router;
