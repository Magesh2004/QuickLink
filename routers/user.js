const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn,isAdmin} = require('../utils/middleware')
const User = require('../controllers/userControllers')



router.route('/register')
    .get(User.RenderRegisterPage)
    .post(catchAsync(User.CreatingNewUser))


router.route('/login')
    .get(User.RenderLoginPage)
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),User.LoginUser)

router.get('/logout',User.LogoutUser)

router.get('/users',isLoggedIn,isAdmin,catchAsync(User.GetUsers))

router.delete('/users/:id',isLoggedIn,isAdmin,catchAsync(User.DeleteUsers))

router.put('/users/:id/access',User.MakeUserAdAdmin)
router.put('/users/:id/revoke',User.RemoveUserAdAdmin)

module.exports = router