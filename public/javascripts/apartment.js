'use strict';

$(document).ready(init);

function init(e){
  $('.rooms').on('click', 'li', roomClicked);
}

function roomClicked() {
  var info = {
    tenentID: "56b0277ad5452563bf193987",
    apartmentID: window.location.pathname.split('/')[2],
    roomID: $(this).data("roomid")
  };
  $.post('/apartments/tenent', info)
  .success(function(data){
    console.log(data);
  }).fail(function(error){
    console.log('we failed you bruh');
  });
}
