'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/users');

router.get('/', function(req, res, next) {
  User.find({}, function(err, items) {
    console.log('errgettingitems:', err);
    console.log('items:', items);
    res.send(items);
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  var user = new User(req.body);
  user.save(function(err, saveditem) {
    console.log('errsavingitem:', err);
    console.log('saveditem:', saveditem);
    res.send(saveditem);
  });
});

router.delete('/:id', function(req, res, next) {
  User.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log('cant remove!');
      res.status(400).send(err);
    } else {
      console.log('removed!');
      res.send('success!');
    }
  });
});

// router.get('/:id', function(req, res) {
//   User.findById(req.params.id, function(err, item) {
//     console.log('item is:'+item);
//     res.render('item', item);
//   });
// });
//
// router.put('/:id', function(req,res){
//   console.log(req.params.id);
//   console.log(req.body);
//   User.update({_id: req.params.id}, {$set : req.body}, function(err){
//     res.send('ok');
//   });
//
// });

module.exports = router;
