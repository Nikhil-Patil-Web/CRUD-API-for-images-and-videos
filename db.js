const mongoose = require('mongoose');
module.exports= async function connection(){
    try{
        await mongoose.connect(process.env.DB);
        console.log("Connected to DATABASE....")
    }catch(err){
        console.log(err)
        console.log("DATABASE COULD NOT BE CONNECTED")
    }
}