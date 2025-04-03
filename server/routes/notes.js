const express=require('express')
const router=express.Router()
const Note=require('../models/Note')
const jwt=require('jsonwebtoken')
const JWT_SECRET='e+qy6fQTrQxh/DRtZ0q9ZXkzC2CJpe3oVvNxv/iGHrU='

const authenticateToken=(req,res,next)=>{
    const authHeader=req.header('Authorization')
    const token=authHeader && authHeader.split(' ')[1]
    if(!token){
        console.log('no token found')
        return res.status(401).json({message:"No Token , authorization denied"})
    }
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
            console.log('failed token verification')
            return res.status(403).json({message:'Invalid token'})
        }
        req.userId=decoded.userId
        next()
    })
}

router.post('/',authenticateToken,async (req,res)=>{
    const {title, body}=req.body
    const note=new Note({
        title, body , userId:req.userId
    })

    await note.save()
    res.json(note)
})

router.get('/', authenticateToken, async (req,res)=>{
    const notes=await Note.find({userId:req.userId})
    res.json(notes)
})

router.delete('/:id', authenticateToken, async(req,res)=>{
    const id=req.params.id;
    await Note.findByIdAndDelete(id).then(()=>res.json({message:"Deleted successfully"}))
    .catch(err=>res.json({message:"Error occured while deleting"}))
})


router.get('/:id',authenticateToken, async(req,res)=>{
    const id=req.params.id
    await Note.findById(id).then(result=>res.json(result))
    .catch(err=>res.json({err:"Error fetching Note"}))
})

module.exports=router;