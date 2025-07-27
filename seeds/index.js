const mongoose =    require('mongoose');
const linksSeed = require('./link');
const link = require('../models/link')

const connectDB = require('../config/db')
connectDB()

const seedDb = async()=>{
    try{
        await link.deleteMany({});
        await link.insertMany(linksSeed);
        console.log("Data added successfully")
    }
    catch(e){
        console.log(e.message)
    }
    
    mongoose.connection.close();
}
seedDb()
