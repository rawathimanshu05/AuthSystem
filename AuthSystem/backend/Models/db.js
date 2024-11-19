const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/auth_data')

mongoose.connection.on('connected',()=>{
    console.log('db is connected');
})


mongoose.connection.on('error',(error)=>{
    console.log('db is not connected',error);
})