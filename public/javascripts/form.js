'use strict';

$(document).ready(init);
var id = 0;
var items = [];
function init(e){
    $('#userform').submit(handleUserEntry);
    $('#apartmentform').submit(handleEntry);
}

function handleEntry(e){
  e.preventDefault();
  var datai = {name: $('input#name').val(), rent: $('input#rent').val(), picurl: $('input#picurl').val(), numrooms: $('input#rooms').val()};
  console.log(datai);
  $.post('/apartments', datai)
  .success(function(data){
    console.log(data);
  }).fail(function(error){
    console.log('we failed you bruh');
  });
  $('input').val('');
}

function handleUserEntry(e){
  e.preventDefault();
  $.post('/users', {name: $('input#name').val()})
  .success(function(data){
    console.log(data);
  }).fail(function(error){
    console.log('we failed you bruh');
  });
  $('input').val('');
}
