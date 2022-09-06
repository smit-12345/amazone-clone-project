const mongoose = require("mongoose");
DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log("connected to database")
}).catch((err) => {
    console.log("Error" + ":" + err.message)
})