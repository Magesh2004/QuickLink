const express = require('express')
const router = express.Router()
const links = require('../models/link')
const {isLoggedIn,isAdmin} = require('../utiliti/middleware')
const catchAsync = require('../utiliti/catchAsync')
const ExpressError = require('../utiliti/ExpressError')


router.get('/',isLoggedIn,catchAsync(async(req,res)=>{
    let {category}= req.query
    category = category ? decodeURIComponent(category) : null;
    let Link
    if (category){
        Link = await links.find({category: category})
    }else{
        Link = await links.find({})
    }
    res.render('links/home',{Link,category});
}))

router.get('/new',isLoggedIn,isAdmin,(req,res)=>{
    res.render('links/new')
})
router.post('/',isLoggedIn,isAdmin,catchAsync(async (req,res)=>{
    const Link = new links(req.body) 
    await Link.save()
    req.flash('success','Added successfully');

    res.redirect('/')
}))
router.get('/:id/edit',isLoggedIn,isAdmin,catchAsync(async(req,res)=>{
    const { id } = req.params;
    const Link = await links.findById(id)
    res.render('links/edit',{Link})
}))
router.put('/:id',isLoggedIn,isAdmin,catchAsync(async(req,res)=>{
    const {id} = req.params;
    const Link = await links.findByIdAndUpdate(id,req.body)
    req.flash('success','Edited successfully');
    res.redirect('/')
}))
router.delete('/:id',isLoggedIn,isAdmin,catchAsync(async(req,res)=>{
    const Link = await links.findByIdAndDelete(req.params.id)
    req.flash('error','Deleted successfully');
    res.redirect('/')
}))


module.exports = router