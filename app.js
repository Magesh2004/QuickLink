const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const methodOverride = require('method-override')
const ejsmate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localPassport = require('passport-local')
const links = require('./models/link')


const linkRoute = require('./routers/link');

// app.use('/',userRoute);


mongoose.connect('mongodb://localhost:27017/quicklink');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Connection error"));
db.once('open',function(){
    console.log("Database Connected");
})
app.listen(8000,(req,res)=>{
    console.log("Server running on port 8000")
});
app.engine('ejs',ejsmate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use('/',linkRoute);