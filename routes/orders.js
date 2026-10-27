const router=require('express').Router(); const mongoose=require('mongoose');
const Order=require('../src/Order'); const Product=require('../src/Product'); const auth=require('../middleware/auth');
router.post('/',auth,async(req,res)=>{
 const {items,shipping}=req.body;
 if(!Array.isArray(items)||items.length===0)return res.status(400).json({message:'Your cart is empty.'});
 const required=['fullName','email','address','city','phone'];
 if(!shipping||required.some(k=>!String(shipping[k]||'').trim()))return res.status(400).json({message:'Please complete all shipping fields.'});
 const session=await mongoose.startSession();
 try{
  let created;
  await session.withTransaction(async()=>{
   let total=0;const savedItems=[];
   for(const item of items){
    const quantity=Number(item.quantity); if(!Number.isInteger(quantity)||quantity<1||quantity>99)throw new Error('Invalid product quantity.');
    const product=await Product.findById(item.productId).session(session);
    if(!product)throw new Error('A product in your cart no longer exists.');
    if(product.stock<quantity)throw new Error(`${product.name} does not have enough stock.`);
    product.stock-=quantity;await product.save({session});
    total+=product.price*quantity;savedItems.push({product:product._id,name:product.name,price:product.price,quantity});
   }
   [created]=await Order.create([{user:req.user.id,items:savedItems,shipping,total:Number(total.toFixed(2))}],{session});
  });
  res.status(201).json({message:'Order placed successfully.',order:{id:created._id,total:created.total,status:created.status}});
 }catch(e){res.status(400).json({message:e.message||'Could not place order.'});}finally{await session.endSession();}
});
router.get('/mine',auth,async(req,res)=>{try{const orders=await Order.find({user:req.user.id}).sort({createdAt:-1});res.json(orders);}catch(e){res.status(500).json({message:'Could not load your orders.'});}});
module.exports=router;
