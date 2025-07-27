const links = require('../models/link');
const ExpressError = require('../utils/ExpressError');


module.exports.GetLink = async(req,res)=>{
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
}

module.exports.RenderNewLinkPage = (req,res)=>{
    res.render('links/new')
}

module.exports.CreateNewLink = async (req,res)=>{
    const { title, category, link } = req.body;
    if (!title || !category || !link) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/link/new');
    }
    const Link = new links({ title, category, link });
    await Link.save();
    req.flash('success','Added successfully');
    res.redirect('/link')
}

module.exports.RenderEditLinkPage = async(req,res)=>{
    const { id } = req.params;
    const Link = await links.findById(id)
    res.render('links/edit',{Link})
}

module.exports.EditLink = async(req,res)=>{
    const {id} = req.params;
    const { title, category, link } = req.body;
    const Link = await links.findByIdAndUpdate(id, { title, category, link }, { new: true, runValidators: true });
    req.flash('success','Edited successfully');
    res.redirect('/link')
}

module.exports.DeleteLink = async(req,res)=>{
    const Link = await links.findByIdAndDelete(req.params.id)
    req.flash('error','Deleted successfully');
    res.redirect('/link')
}