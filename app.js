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
const User = require('./models/user.js')
const links = require('./models/link')
const ExpressError = require('./utiliti/ExpressError')
const catchAsync = require('./utiliti/catchAsync')
const linkRoute = require('./routers/link');
const userRoute = require('./routers/user')




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
app.use(express.static(path.join(__dirname,'public')))
const sessionConfig = {
    secret : "Thereisasecret",
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        expires : Date.now()+1000*60*60*24*7,
        maxAge : 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localPassport(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




app.use((req,res,next)=>{
    res.locals.Category =  ['Personal Document','Land & Property','Vehicle & Transport','Bill & utilities','Goverment Scheme & Welface','Money & banking','Police & Legal','Employment & skill develpment','Education & student services',]
    res.locals.currentUser = req.user || {}
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})
app.get('/',(req,res)=>{
    res.render('home')
})
app.use('/link',linkRoute);
app.use('/',userRoute)

app.get('*',(req,res,next)=>{
    next(new ExpressError("Page not found",404))
})

app.use((err,req,res,next)=>{
    const {message = "Something went wrong",statusCode = 500} = err;
    res.status(statusCode).render('error',{err})

})