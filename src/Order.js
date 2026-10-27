const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 items:[{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},name:String,price:Number,quantity:{type:Number,required:true,min:1}}],
 shipping:{fullName:{type:String,required:true},email:{type:String,required:true},address:{type:String,required:true},city:{type:String,required:true},phone:{type:String,required:true}},
 total:{type:Number,required:true,min:0},status:{type:String,enum:['Pending','Processing','Shipped','Delivered','Cancelled'],default:'Pending'}
},{timestamps:true});
module.exports = mongoose.models.Order || mongoose.model('Order',orderSchema);
