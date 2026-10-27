const router=require('express').Router();
const bcrypt=require('bcryptjs'); const jwt=require('jsonwebtoken'); const User=require('../src/User');
function tokenFor(user){return jwt.sign({id:user._id,email:user.email,name:user.name},process.env.JWT_SECRET,{expiresIn:'7d'});}
router.post('/register',async(req,res)=>{try{
 if(!process.env.JWT_SECRET)return res.status(500).json({message:'JWT_SECRET is not configured in .env'});
 const {name,email,password}=req.body;
 if(!name||!email||!password)return res.status(400).json({message:'Name, email and password are required.'});
 if(password.length<8)return res.status(400).json({message:'Password must be at least 8 characters.'});
 if(await User.findOne({email}))return res.status(409).json({message:'An account with this email already exists.'});
 const user=await User.create({name,email,password:await bcrypt.hash(password,12)});
 res.status(201).json({token:tokenFor(user),user:{id:user._id,name:user.name,email:user.email}});
 }catch(e){res.status(500).json({message:'Could not create account.'});}});
router.post('/login',async(req,res)=>{try{
 if(!process.env.JWT_SECRET)return res.status(500).json({message:'JWT_SECRET is not configured in .env'});
 const {email,password}=req.body; const user=await User.findOne({email});
 if(!user||!await bcrypt.compare(password||'',user.password))return res.status(401).json({message:'Email or password is incorrect.'});
 res.json({token:tokenFor(user),user:{id:user._id,name:user.name,email:user.email}});
 }catch(e){res.status(500).json({message:'Could not sign in.'});}});
module.exports=router;
