const jwt = require('jsonwebtoken');
module.exports = function auth(req,res,next){
 const header=req.headers.authorization;
 if(!header || !header.startsWith('Bearer ')) return res.status(401).json({message:'Please sign in to continue.'});
 try { const secret=process.env.JWT_SECRET; if(!secret) return res.status(500).json({message:'JWT_SECRET is not configured.'}); req.user=jwt.verify(header.slice(7),secret); next(); }
 catch(_err){return res.status(401).json({message:'Session expired. Please sign in again.'});}
};
