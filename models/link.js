const { required } = require('joi')
const mongoose = require('mongoose')


const linkSchema = mongoose.Schema({
    title : String,
    category : {
        type : String,
        enum : ['Personal Document','Land & Property','Vehicle & Transport','Bill & utilities','Goverment Scheme & Welface','Money & banking','Police & Legal','Employment & skill develpment','Education & student services',]
    },
    link : {
        type : String,
        required : true
    }
    // ,
    // authur : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'User',
    //     required : true
    // }
})



module.exports = mongoose.model('Link',linkSchema)

// const mongoose = require('mongoose')
// const passportLocalMongoose = require('passport-local-mongoose')

// const userSchema = mongoose.Schema({
//     email:{
//         type : true,
//         required : true,
//         email : true
//     },
//     pinned :[{
//         type : mongoose.Schema.Types.ObjectId,
//         ref:'link'
//     }]
// })

// userSchema.plugins(passportLocalMongoose)

// module.exports = mongoose.model('User',userSchema)