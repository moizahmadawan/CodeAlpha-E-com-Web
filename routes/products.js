const router=require('express').Router();
const Product=require('../src/Product');
router.get('/',async(req,res)=>{try{
 const filter={}; if(req.query.category && req.query.category!=='All') filter.category=req.query.category;
 if(req.query.search) filter.$or=[{name:{$regex:req.query.search,$options:'i'}},{description:{$regex:req.query.search,$options:'i'}}];
 const products=await Product.find(filter).sort({featured:-1,createdAt:-1}); res.json(products);
}catch(e){res.status(500).json({message:'Could not load products. Check your database connection.'});}});
router.get('/:id',async(req,res)=>{try{const p=await Product.findById(req.params.id);if(!p)return res.status(404).json({message:'Product not found'});res.json(p);}catch(e){res.status(400).json({message:'Invalid product ID'});}});
module.exports=router;
