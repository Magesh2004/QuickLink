const express = require('express')
const router = express.Router()
const links = require('../models/link')

router.get('/',async(req,res)=>{
    const Link = await links.find({})
    res.render('links/home',{Link})
})

router.get('/new',(req,res)=>{
    res.render('links/new')
})
router.get('/:id/edit',async(req,res)=>{
    const { id } = req.params;
    const Link = await links.findById(id)
    console.log(Link)
    res.send("Working")
})
router.delete('/:id',async(req,res)=>{
    const Link = await links.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
router.post('/',async (req,res)=>{
    const Link = new links(req.body) 
    console.log(Link)
    await Link.save()
    res.redirect('/')
})


module.exports = router