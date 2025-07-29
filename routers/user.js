const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn,isAdmin} = require('../middleware/middleware')
const User = require('../controllers/userControllers')
const { validateUser } = require('../middleware/validate')



router.route('/register')
    .get(User.RenderRegisterPage)
    .post(validateUser(),catchAsync(User.CreatingNewUser))


router.route('/login')
    .get(User.RenderLoginPage)
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),User.LoginUser)

router.get('/logout',User.LogoutUser)

router.get('/users',isLoggedIn,isAdmin,catchAsync(User.GetUsers))

router.delete('/users/:id',isLoggedIn,isAdmin,catchAsync(User.DeleteUsers))

router.put('/users/:id/access',User.MakeUserAdAdmin)
router.put('/users/:id/revoke',User.RemoveUserAdAdmin)

module.exports = router