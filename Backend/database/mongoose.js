const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true ,
    useCreateIndex: true ,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then( () => {
    console.log('MongoDB Connected !!')
}).catch( (err) => {
    console.log(err)
}) 
mongoose.Promise = global.Promise;