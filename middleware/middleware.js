module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','You must be logged in')
        return res.redirect('/login')
    }
    next()
}

module.exports.isAdmin = (req,res,next)=>{
    if(!req.user || !req.user.isAdmin){
        req.flash('error','Access Denied')
        return res.redirect('/')
    }
    next()
}