const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var passwordValidator = require('password-validator');
const usermodel = require('../Models/UserModel');
const ensureAuthorization = require('../Middleware/Auth');

var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase(1)                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123','admin@123','Admin@123']); // Blacklist these values

const router = express.Router()


router.post('/register',async (req,res)=>{
     try{
        const {username,email,password} = req.body
        const user = await usermodel.findOne({username : req.body.username})
        if(user){
            return res.status(409).json({message : "Username already exists",success:false})
        }

        const ispwd = schema.validate(password)
        if(!ispwd){
            return res.status(400).json({
                message: "Invalid password: must be at least 5 characters long, no more than 100, contain one uppercase and one lowercase character, no special characters, and no spaces."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const data = new usermodel({username,email,password:hashedPassword});
       
        await data.save();
        res.status(201).json({message : "successfully Register",success:true})

     } catch(error){
        console.log(error);
        if(error.errors.username)
            return res.status(500).send({result:'Fail',message:error.errors.username})
        else if(error.errors.email)
            return res.status(500).send({result:'Fail',message:error.errors.email})
        else if(error.errors.password)
            return res.status(500).send({result:'Fail',message:error.errors.password})
        else
        return res.status(500).send({result:'Fail',message:'Internal server error'})
     }
})



router.post('/login',async (req,res)=>{
    try{
        const {username,password} = req.body
        if (!username) {
            return res.status(500).send({ result: 'Fail', message: 'Username are required.',success:false })
        }else if(!password) {
            return res.status(500).send({result: 'Fail', message: 'password are required.',success:false})
        }
        const user = await usermodel.findOne({username})
        const errorMsg = 'Auth failed email or password is wrong'
        if(!user){
           return res.status(403).send({result:'Fail',message:errorMsg,success:false})
        }

        const ispwdequal = await bcrypt.compare(password,user.password)
        if(!ispwdequal){
            return res.status(403).send({result:'Fail',message:errorMsg,success:false})   
        }

        const token = jwt.sign(
            {email: user.email,_id:user.id},
            process.env.SECRET_KEY,
            {expiresIn: '24h'})
        
        res.status(200).json({message : "login successfully",
            success:true,
            token:token,
            username:user.username
        })


    } catch(error){
        console.log(error);
        return res.status(500).send({result:'Fail',message:'Internal server error'});
    }
})









module.exports = router