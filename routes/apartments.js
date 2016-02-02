'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/users');
var Apartment = require('../models/apartments');

router.get('/', function(req, res, next) {
  Apartment.find({}, function(err, items) {
    console.log('errgettingitems:', err);
    console.log('items:', items);
    res.send(items);
  });
});

router.post('/', function(req, res) {
  // console.log(req.body);
  var rooms = [];
  for (var i = 0; i<req.body.numrooms;i++)
    rooms.push({numroom: i});
  req.body.rooms = rooms;
  var apartment = new Apartment(req.body);
  apartment.save(function(err, saveditem) {
    res.send(saveditem);
  });
});

router.delete('/:id', function(req, res, next) {
  Apartment.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log('cant remove!');
      res.status(400).send(err);
    } else {
      console.log('removed!');
      res.send('success!');
    }
  });
});

router.get('/:id', function(req, res) {
  // console.log(req.params);
  Apartment.findById(req.params.id, function(err, item) {
    console.log("item: ", item);
    res.render('apartment', item);
  });
});

router.post('/:id', function(req, res) {
  Apartment.findById(req.body.apartmentID, function(err, item) {
    var room = item.rooms.find(function(val,index){
      return (val.numroom === parseInt(req.body.roomID)) ? val: false;
    });
    User.findById(req.body.tenentID, function(err, tenent){
      if(err) return res.status(400).send(err);
      console.log(tenent);
      item.rooms[item.rooms.indexOf(room)].tenent = tenent;
      item.save(function (err) {
        if (err) res.status(400).send(err);
        res.send(item);
    })
    });
  });
});


module.exports = router;
