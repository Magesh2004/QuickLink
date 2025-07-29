const express = require('express')
const router = express.Router()
const {isLoggedIn,isAdmin} = require('../middleware/middleware')
const catchAsync = require('../utils/catchAsync')
const Link = require('../controllers/linkController')
const {validateLink} = require('../middleware/validate')
const ExpressError = require('../utils/ExpressError')


router.route('/')
    .get(isLoggedIn,catchAsync(Link.GetLink))
    .post(isLoggedIn,isAdmin,validateLink(),catchAsync(Link.CreateNewLink))

router.get('/new',isLoggedIn,isAdmin,Link.RenderNewLinkPage)

router.get('/:id/edit',isLoggedIn,isAdmin,catchAsync(Link.RenderEditLinkPage))

router.route('/:id')
    .put(isLoggedIn,isAdmin,catchAsync(Link.EditLink))
    .delete(isLoggedIn,isAdmin,catchAsync(Link.DeleteLink))


module.exports = router