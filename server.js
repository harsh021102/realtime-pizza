const express = require('express')
const app = express()
const PORT = process.env.PORT||3000
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

// database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database connected...");
});

app.use(express.static('public'))


//set template engine

app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})