const mongoose = require("mongoose")

const connectdb = async () => {
    try {
         const res = await mongoose.connect("mongodb://localhost:27017/firstdb")
         console.log("connected to a db successfully")
         
    }
    catch(err) {
     console.log(err)
    }
}

module.exports = {connectdb}