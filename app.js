const express = require('express');
const app = express();
const path = require('path')
const methodOverride = require('method-override')
const ejsmate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError')
const linkRoute = require('./routers/link');
const userRoute = require('./routers/user')
const connectDB = require('./config/db.js')
const setupPassport = require('./config/passport');
require('dotenv').config()

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


connectDB()

app.engine('ejs',ejsmate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname,'public')))

app.use(session(sessionConfig))

app.use(flash())

setupPassport(app);


app.use((req,res,next)=>{
    res.locals.Category =  ['Personal Document','Land & Property','Vehicle & Transport','Bill & utilities','Goverment Scheme & Welface','Money & banking','Police & Legal','Employment & skill develpment','Education & student services']
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

app.listen(process.env.PORT,()=>{
    console.log("Server running on port 8000")
});