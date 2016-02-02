$(document).ready(init);
var $mrow;
var mrowid;
var total = 0;
var domstuff;
var itemcount;
var namesorted = false;
var pricesorted = false;

function init(){
  $('tbody').on('click', '.trash',function(e){
      e.stopPropagation();
      var $row = $(this).closest('tr');
      var rowid = $row.data('id');
      $.ajax({url:'/apartments/'+rowid, method: 'DELETE'}).success(function(data){
        console.log('data:', data);
        location.reload();
      })
      .fail(function(err) {
        console.log('err:', err);
      });
  });

  // $('tbody').on('click', '.update',function(e){
  //     e.stopPropagation();
  //     $mrow = $(this).closest('tr');
  //     mrowid = $mrow.data('id');
  //     console.log(mrowid);
  //     $('#updateItem').modal();
  // });
  //
  // $('#updateItem').on('click', '.updateItem', function(e){
  //   $.ajax({url: '/items/'+mrowid, method: 'PUT', data: {name: $('input#mname').val(), price: $('input#mprice').val(), picurl: $('input#mpicurl').val()}});
  //   $('input').val('');
  // });
  //
  $('tbody').on('click', 'tr',function(e){
    var $row = $(this).closest('tr');
    var rowid = $row.data('id');
    location.replace('/apartments/'+rowid);
  });


  $.get('/apartments')
    .success(function(data){
      console.log(data);
      itemcount=0;
      domstuff = data.map(function(input, index){
        var $button = $('<button>').addClass('btn btn-warning trash btn-sm').append('Remove item');
        var $tr = $('#template').clone().attr('id', 'apartment'+itemcount).data('id', input._id);
        $tr.find('.name').text(input.name);
        $tr.find('.rent').text('$'+input.rent.toFixed(2));
        // var $img = $('<img>').attr('src', input.picurl).attr('style', 'max-width:40px');
        $tr.find('.rooms').text(input.numrooms);
        // $tr.find('.picurl').append($img);
        $tr.find('.remove').append($button);
        itemcount++;
        return $tr.show();
      });
      $('tbody').append(domstuff);
    })
    .fail(function(err) {
      console.error(err);
    });
}
