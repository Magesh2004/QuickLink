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
})



module.exports = mongoose.model('Link',linkSchema)

