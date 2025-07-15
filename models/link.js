const mongoose = require('mongoose')


const linkSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    category : {
        type : String,
        enum : ['Personal Document','Land & Property','Vehicle & Transport','Bill & Utilities','Government Scheme & Welfare','Money & Banking','Police & Legal','Employment & Skill Development','Education & Student Services']
    },
    link : {
        type : String,
        required : true
    }
})



module.exports = mongoose.model('Link',linkSchema)

