const mongoose = require('mongoose');

const orderschema=mongoose.Schema(

    {
        cart: { type: Array,
         require: true
        },
        userdelt: { type: Object,
            require: true
           },
        sheeping: { type: Object,
        require: true
        },
        total:{
            type:Number,
            require: true
        },
        custid:{ type: String,
            require: true
        },
        status:{
            type:String,
            default:"on the way"
        }

          

    }
)
orders=mongoose.model('order',orderschema)
module.exports=  orders ;