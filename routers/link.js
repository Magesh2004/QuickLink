const express = require('express')
const router = express.Router()
const links = require('../models/link')
const {isLoggedIn,isAdmin} = require('../utils/middleware')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')


router.get('/',isLoggedIn,catchAsync(async(req,res)=>{
    let {category,search}= req.query
    category = category ? decodeURIComponent(category) : null;
    search = search ? decodeURIComponent(search) : null;
    let Link
    if (search){
        Link = await links.find({title : {$regex: search, $options: 'i'}})
    }else if(category){
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
    const { title, category, link } = req.body;
    if (!title || !category || !link) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/link/new');
    }
    const Link = new links({ title, category, link });
    await Link.save();
    req.flash('success','Added successfully');
    res.redirect('/link')
}))
router.get('/:id/edit',isLoggedIn,isAdmin,catchAsync(async(req,res)=>{
    const { id } = req.params;
    const Link = await links.findById(id)
    res.render('links/edit',{Link})
}))
router.put('/:id',isLoggedIn,isAdmin,catchAsync(async(req,res)=>{
    const {id} = req.params;
    const { title, category, link } = req.body;
    const Link = await links.findByIdAndUpdate(id, { title, category, link }, { new: true, runValidators: true });
    req.flash('success','Edited successfully');
    res.redirect('/link')
}))
router.delete('/:id',isLoggedIn,isAdmin,catchAsync(async(req,res)=>{
    const Link = await links.findByIdAndDelete(req.params.id)
    req.flash('error','Deleted successfully');
    res.redirect('/link')
}))


module.exports = router