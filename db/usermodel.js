const mongoose = require('mongoose');

const usermoodel=mongoose.Schema(

    {
        name: { type: String,
         require: true
        },
        email: { type: String,
            require: true,
            unique: true
           },
           password: { type: String,
            require: true
           },
           isadmin: { type: Boolean,
            require: true,
            default:false
           }
    }
)
user=mongoose.model('user',usermoodel)
module.exports=  user ;