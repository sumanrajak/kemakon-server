const express = require("express");
const data = require("./deta.js");
const mongoose = require('mongoose');
const cors= require('cors')
const jwt = require('jsonwebtoken')
// const gettoken = require('./util')
const oath=require('./util')
// const { product } = require("./deta.js");
var bodyParser = require('body-parser')

 const products= require("./db/product")
 const user= require("./db/usermodel")
 const orders= require("./db/order")

 const con_url='mongodb+srv://suman2:suman@cluster0.dd81x.mongodb.net/kemakon?retryWrites=true&w=majority'
 mongoose.connect(con_url,{
    
     useNewUrlParser:true,
     useUnifiedTopology:true,
     useCreateIndex:true
 })
 const db= mongoose.connection;
 db.once("open",()=>{
   console.log("db conected");})

const app= express();
app.use(cors())

app.use(express.json());
const port=process.env.PORT || 3001
app.get('/',(req,res)=>{
    res.send('hi')
})
app.get('/api/products', async (req,res)=>{    //GET ALL PRODUCT
    // res.send(data.product)
    try {
        const meet= await products.find();
     res.send(meet)
    // res.json({msessage:meet})
// console.log(meet)
    } catch (error) {
        res.json({msessage:error})
    }
})

app.post("/addproduct",(req,res)=>{     //ADDPRODUCT
    //console.log(req.body)
    const meet=new products(req.body)
    meet.save().then((data)=>{
        res.status(201).json(data)
    }).catch (()=>{
        res.status(500).json({msg:"error"})
    })
      })
app.delete('/:id',async (req,res)=>{  //DELT PRODUCT
try {
    const meetdel= await products.deleteOne({_id:req.params.id});

res.json(meetdel)

} catch (error) {
    res.json({msessage:error})
}


})


app.post("/adduser",(req,res)=>{    //SIGNIN
// console.log(req.body)
const users=new user(req.body)
users.save().then((data)=>{
    res.status(201).json(data)
}).catch (()=>{
    res.status(201).json({msg:"error"})
})
    })

app.post('/checkuser',async (req,res)=>{   //LOGIN
    //console.log(req.body)
    try {
        const userdelt= await user.findOne({
            // _id:req.body._id,
            // name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });
    if(userdelt){
        res.status(201).json({_id :userdelt._id,
            name :userdelt.name,
            email :userdelt.email,
            isadmin :userdelt.isadmin,
            token: jwt.sign({_id :userdelt._id},"SOMETHONGHUNIQUE",{
                expiresIn:'40h'
            })
        })
       
    }else{
        res.status(201).json({message: "invlid"})
// console.log("error")
    }
    

    } catch (error) {
        res.json({msessage:error})
    }
    
    
})
app.post('/pdp/:id',async (req,res)=>{   //one pro
    //console.log(req.body)
    try {
        const userdelt= await products.findOne({_id:req.params.id});
    if(userdelt){
        res.status(201).json(userdelt)
       
    }else{
        res.status(201).json({message: "invlid"})
// console.log("error")
    }
    

    } catch (error) {
        res.json({msessage:error})
    }
    
    
})

app.post("/addorder",(req,res)=>{     //ADD ORDER
    //console.log(req.body)
    const order=new orders(req.body)
    order.save().then((data)=>{
        res.status(201).json(data)
    }).catch ((error)=>{
        res.status(500).json({msg:error})
    })
      })

      app.get('/adminorder', async (req,res)=>{    //GET ALL orders
        // res.send(data.product)
        try {
            const meet= await orders.find();
         res.send(meet)
        // res.json({msessage:meet})
    // console.log(meet)
        } catch (error) {
            res.json({msessage:error})
        }
    })
    app.get('/order/:id', async (req,res)=>{    //GET customer orders
        // res.send(data.product)
        try {
            const meet= await orders.find({custid:req.params.id});
         res.send(meet)
        
        } catch (error) {
            res.json({msessage:error})
        }
    })





app.listen(port,()=>{
    console.log( `server running at ${port}`);
})
