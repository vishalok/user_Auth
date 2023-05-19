const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const User = require('./models/users.models');
const { PORT } = require('./configs/server.config');
const { DB_URL, DB_PROD_URL } = require('./configs/db.config');

let connectionString = DB_PROD_URL;

if(process.env.NODE_ENV !== 'production'){
    connectionString = DB_URL;
}
//Using the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(connectionString);

//IIFE
(async ()=> {
    try{    
        await mongoose.connect(connectionString);
        console.log('db connected');
        await init();
    }
    catch(err){
        console.error('error getting while connecting mongoDB', err);
    }

})();

// Inserting default enteries in DB
async function init(){
    try{
await User.collection.drop();
            await User.create({
                first_name: "ABC",
                last_name:"XYZ",
                email: "abcxyz@gmail.com",
                password: bcrypt.hashSync('Welcome', 8)
            })
}
catch(err){
    console.log('error while inserting default entries in DB', err);
}
}

// call the routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get('/',(req,res)=>{
    res.send('<h1>app is running sucessfully!!!<h1>')
})

app.listen(PORT, ()=> {
    console.log(`server is running on port: ${PORT}, please access it on http://localhost:${PORT}`)
})