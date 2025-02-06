const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const catchAsync = require('../utiliti/catchAsync')
const {isLoggedIn} = require('../utiliti/middleware')

router.get('/register',isLoggedIn,(req,res)=>{
    res.render('user/register')
})

router.post('/register',isLoggedIn,catchAsync(async(req,res,next)=>{
    const {username,password} = req.body
    const user = new User ({username})
    const registerUser = await User.register(user,password)
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
        res.redirect('/')
    })
})



module.exports = router