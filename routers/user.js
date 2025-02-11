const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const passport = require('passport')
const catchAsync = require('../utiliti/catchAsync')
const {isLoggedIn,isAdmin} = require('../utiliti/middleware')

router

router.route('/register')
    .get(isLoggedIn,isAdmin,(req,res)=>{
        res.render('user/register')
    })
    .post(isLoggedIn,isAdmin,catchAsync(async(req,res,next)=>{
        const {username,password,email} = req.body
        const isAdmin = req.body.isAdmin === "true"
        const user = new User ({username,email,isAdmin})
        const registerUser = await User.register(user,password)
        if(isAdmin){
            req.flash('success','Admin added successfully');
        }else{
            req.flash('success','User added successfully');
        }
        
        res.redirect('/')
    }))


router.route('/login')
    .get((req,res)=>{
        res.render('user/login')
    })
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),async(req,res,next)=>{
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

router.get('/users',isLoggedIn,isAdmin,catchAsync(async(req,res)=>{
    const users =await User.find({})
    res.render('user/users',{users})
}))

router.delete('/users/:id',isLoggedIn,isAdmin,catchAsync(async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    req.flash('error','Deleted successfully');
    res.redirect('/users')
}))

router.put('/users/:id/access',async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params,{sAdmin:true})
})
router.put('/users/:id/revoke',async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params,{isAdmin:false})
})

module.exports = router