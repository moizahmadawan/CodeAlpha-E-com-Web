require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const Product = require('./src/Product');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'CodeAlpha E-commerce API' }));
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
const seedProducts = [
 {name:'Studio Headphones',description:'Immersive sound, soft cushions and a clean everyday design.',price:79.99,category:'Electronics',image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',stock:20,featured:true},
 {name:'Everyday Sneakers',description:'Lightweight comfort for city walks and busy days.',price:64.50,category:'Fashion',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',stock:18,featured:true},
 {name:'Minimal Wristwatch',description:'A timeless dial with a versatile strap and understated style.',price:99.00,category:'Accessories',image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',stock:12,featured:true},
 {name:'Daily Carry Backpack',description:'A practical, spacious backpack for work, study and travel.',price:49.95,category:'Accessories',image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',stock:25,featured:false},
 {name:'Ceramic Coffee Set',description:'A simple ceramic mug set to make your daily coffee feel special.',price:29.99,category:'Home',image:'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85',stock:30,featured:false},
 {name:'Classic Sunglasses',description:'An easy-to-style frame for bright days outdoors.',price:34.00,category:'Fashion',image:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',stock:16,featured:false},
 {name:'Desk Lamp',description:'Warm, focused lighting for your desk or bedside table.',price:42.00,category:'Home',image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',stock:14,featured:false},
 {name:'Wireless Speaker',description:'Portable sound with a compact form for any room.',price:59.99,category:'Electronics',image:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85',stock:21,featured:true}
];
async function start(){
 const port=process.env.PORT||5000;
 if(process.env.MONGODB_URI){
  try { await mongoose.connect(process.env.MONGODB_URI); console.log('MongoDB connected');
   if(await Product.countDocuments()===0){await Product.insertMany(seedProducts); console.log('Sample products inserted');}
  } catch(err){console.error('MongoDB connection failed:',err.message); console.log('Starting server without database. Product API will return a database error until MongoDB is configured.');}
 } else console.log('MONGODB_URI not set. Copy .env.example to .env and configure MongoDB.');
 app.listen(port,()=>console.log(`Store running at http://localhost:${port}`));
}
start();
