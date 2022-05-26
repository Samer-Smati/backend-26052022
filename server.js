const express = require('express');
require('dotenv').config();
const ourConnectionToDataBase = require('./config/connectDb');
const init = require('./config/setup');
const userRoutes = require('./routes/user.route');
const app = express();
app.use(express.json());
app.use('/user/',userRoutes);

const PORT = process.env.PORT || 5000

ourConnectionToDataBase();
init(); 

app.listen(PORT,(err)=>{
    if(err) throw console.log(err);
    console.log(`listen to port ${PORT}`)
})