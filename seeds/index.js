const mongoose =    require('mongoose');
const linksSeed = require('./link');
const link = require('../models/link')

mongoose.connect('mongodb://localhost:27017/quicklink');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Connection error"));
db.once('open',function(){
    console.log("Database Connected")
})

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
