const m = require('../models');
const axios = require('axios');
const router = require('express').Router();

//check to see if the disconnect dependencies are required elsewhere with create and findById methods
const Discogs = require('disconnect').Client;
const db = new Discogs().database();


function currentUser() {
    const path = '/api/users/login'
    router
        .get(path, function(req, res){
            console.log(res.data)
        })
        .catch(err=>console.log(err))

}
console.log(currentUser)
