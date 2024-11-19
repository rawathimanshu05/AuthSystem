
const jwt = require('jsonwebtoken')
const ensureAuthorization = (req,res,next) =>{
    const auth = req.headers['authorization']
    if(!auth){
        return res.status(403).json({message:'Unauthorization, Jwt token'})
    }
    try{
    const decode = jwt.verify(auth,process.env.SECRET_KEY)
    req.user = decode;
    next()
    } catch(error){
        console.log(error);
        return res.status(403).json({message:'Unauthorization, Jwt token'})
    }
}

module.exports = ensureAuthorization