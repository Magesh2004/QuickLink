const User = require('../models/user.js')

module.exports.RenderRegisterPage = (req,res)=>{
        if (req.isAuthenticated() && req.user.isAdmin) {
        return res.render('user/registerAdmin');
    }
        res.render('user/register')
}

module.exports.CreatingNewUser =async(req,res,next)=>{
        const {username,password,email} = req.body
        const existingUser = await User.findOne({username})
        if(existingUser) {
            req.flash('error','User already exist');
            return res.redirect('/register')
        }
        let isAdmin = false;
        if (req.user && req.user.isAdmin && typeof req.body.isAdmin !== 'undefined') {
            isAdmin = req.body.isAdmin === "true";
        }
        const user = new User ({username,email,isAdmin})
        const registerUser = await User.register(user,password)
        if(isAdmin){
            req.flash('success','Admin added successfully');
        }else{
            req.flash('success','User added successfully');
        }
        res.redirect('/link')
    }

module.exports.RenderLoginPage = (req,res)=>{
        res.render('user/login')
    }

module.exports.LoginUser = async(req,res,next)=>{
        req.flash('success','Welcome back');
        res.redirect('/link')
    }

module.exports.LogoutUser = (req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash('error','Good bye !')
        res.redirect('/')
    })
}

module.exports.GetUsers = async(req,res)=>{
    const users =await User.find({})
    res.render('user/users',{users})
}

module.exports.DeleteUsers = async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    req.flash('error','Deleted successfully');
    res.redirect('/users')
}


module.exports.MakeUserAdAdmin = async(req,res)=>{
    const existAdmin = await User.findById(req.params.id)
    if(existAdmin.isAdmin){
        req.flash('error','Already an admin')
        return res.redirect('/users')
    }
    const user = await User.findByIdAndUpdate(req.params.id,{isAdmin:true})
    req.flash('success','Made User As Admin');
    res.redirect('/users')
}

module.exports.RemoveUserAdAdmin = async(req,res)=>{
    const existAdmin = await User.findById(req.params.id)
    if(!existAdmin.isAdmin){
        req.flash('error','Already an user')
        return res.redirect('/users')
    }
    const user = await User.findByIdAndUpdate(req.params.id,{isAdmin:false})
    req.flash('success','Revoked User As Admin');
    res.redirect('/users')
}

