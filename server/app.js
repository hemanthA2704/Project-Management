const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Port = process.env.PORT || 8000;
const {MongoURI} = require('./config/keys');


app.use(express.json());
app.use(require('./routes/teacher'));
app.use(require('./routes/student'));
app.use(require('./routes/project'));
app.use(require('./routes/auth'));

mongoose.connect(MongoURI,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log("connected to database");
})
mongoose.connection.on('error', (err) => {
    console.log("err connecting to DB", err);
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.resolve(__dirname,'client','build')))
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(Port, () => {  
    console.log("server is running on port no: ", Port);
})


