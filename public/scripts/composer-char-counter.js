

$(document).ready(function() {
var maxLength = 140;
$('textarea').keyup(function() {
  // console.log(this)
  var length = $(this).val().length;
  var length = maxLength-length;
  $('.counter').text(length);


   if (length >= 0) {
   //$('.counter').text(length);
  $(".counter").css( {"color": "black"})
} else {
  $(".counter").css( {"color": "red"})
}
// } else {$(".counter").css("color": "black");}

});

// $("textarea").on('click', function() {
//   console.log(this); //The this keyword here refers to something else!
// });



});

