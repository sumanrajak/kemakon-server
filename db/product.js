const mongoose = require('mongoose');

const productschema=mongoose.Schema(

    {
        name: { type: String,
         require: true
        },
        image: { type: String,
            require: true
           },
           price: { type: String,
            require: true
           },
           brand: { type: String,
            require: true
           }, 
           id:{ type: String,
           
           }

    }
)
products=mongoose.model('product',productschema)
module.exports=  products ;