const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
require('./Models/db')
const user = require('./Routes/Userroutes')


const port = process.env.PORT || 8000


app.use(express.json())
app.use(cors())
app.use('/api', user)


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})