const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const user = new mongoose.model("user_detail",userschema)
module.exports = user