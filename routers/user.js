const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const passport = require('passport')
const catchAsync = require('../utiliti/catchAsync')
const {isLoggedIn,isAdmin} = require('../utiliti/middleware')

router.get('/register',isLoggedIn,isAdmin,(req,res)=>{
    res.render('user/register')
})

router.post('/register',isLoggedIn,isAdmin,catchAsync(async(req,res,next)=>{
    const {username,password,email} = req.body
    const isAdmin = req.body.isAdmin === "true"
    const user = new User ({username,email,isAdmin})
    const registerUser = await User.register(user,password)
    console.log(user)
    req.flash('success','Admin added successfully');
    res.redirect('/')
}))

router.get('/login',(req,res)=>{
    res.render('user/login')
})

router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),async(req,res,next)=>{
    req.flash('success','Welcome back');
    res.redirect('/')
})

router.get('/logout',(req,res)=>{
    req.logOut(function(err){
        if(err){
            return next(err)
        }
        req.flash('error','Good bye !')
        res.redirect('/login')
    })
})



module.exports = router