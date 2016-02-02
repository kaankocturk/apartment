'use strict';
var express = require('express');
var mongoose = require('mongoose');

var apartmentSchema = new mongoose.Schema({
  name: String,
  rent: Number,
  picurl: String,
  rooms: [{numroom: Number,
          tenant: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],
  numrooms: Number
});

var Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
