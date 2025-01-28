const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect('mongodb://localhost:27017/Planifica-IT')
// mongoose.connect(process.env.MONGO_URI)
    .then(
        ()=>{
            console.log("Connected MongoDB ⚡")
        }
    ).catch(
        (err)=>{
            console.log("the error 🙂 : " + err)
            
        }
    )


module.exports = mongoose ;    