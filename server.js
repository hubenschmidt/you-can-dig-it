const express = require('express');
const app = express();
const bodyParers = require('body-parser');
const cors = require('cors');
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function(){
    console.log("Server is runnign on Port: " + PORT);
});

mongoose.connect('mongodb://127.0.0.1:27017/diggin', {
    useNewUrlParser: true });
    const connection = mongoose.connection;
})

connection.once('open', function(){
    console.log("MongDB database connection success! -- diggin")
})

todoRoutes.route('/').get(function(req,res){
    Database.
})

app.listen(PORT, function(){
    console.log("Server is running on Port: " + PORT)
});