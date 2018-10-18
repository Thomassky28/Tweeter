
$(document).ready(function() {



function getTimeStamp(miliseconds) {
  var days, total_hours, total_minutes, total_seconds;
  let today = new Date().getTime();
  let timeDiff = today - miliseconds;

  total_seconds = parseInt(Math.floor(timeDiff / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  if (days < 0) {
      return "0 day ago"
    } else {
     return `${days} days ago`;
  }
}

function createTweetElement(tweet) {
  let timeAgo =  getTimeStamp(tweet.created_at);
  let $tweet = $('<article>').addClass('tweet');

  let $header = $('<header>').addClass('ID');
  let $img    = $('<img>').addClass("profilePic").attr("src", tweet.user.avatars.small);
  let $userName = $('<p>').addClass("userName").text(tweet.user.name);
  let $handle = $('<p>').addClass("atName").text(tweet.user.handle);

  let $content = $('<p>').addClass("contents").text(tweet.content.text);

  let $hr = $('<hr>');

  let $footer = $('<footer>').addClass('tFooter');
  let $div1 = $('<div>').addClass('date');
  let $created_at = $('<p>').text(timeAgo);

  let $div2 = $('<div>').addClass('fas');
  let $icon1 = $('<i>').addClass('fas fa-flag');
  let $icon2 = $('<i>').addClass('fas fa-retweet');
  let $icon3 = $('<i>').addClass('fas fa-heart');

  $tweet.append($header);
  $tweet.append($content);
  $tweet.append($hr);
  $tweet.append($footer);

  $header.append($img);
  $header.append($userName);
  $header.append($handle);

  $footer.append($div1);
  $footer.append($div2);

  $div1.append($created_at);
  $div2.append($icon1);
  $div2.append($icon2);
  $div2.append($icon3);

  return $tweet;
}


function renderTweets(tweets) {
  for(var i = 0; i < tweets.length; i ++){
    createTweetElement(tweets[i]);
    var $tweet = createTweetElement(tweets[i]);
    $('.tweets').append($tweet);
  }
}


$( "#submit" ).on( "click", function( event ) {

    event.preventDefault();
    if ( $('textarea').val().length === 0) {
       $("#E1").slideToggle();
    } else if ( $('textarea').val().length > 140 ) {
         $("#E2").slideToggle();
    } else {

      var content =  $('textarea').serialize();
      $.post("/tweets", content , function ( data ) {
         $('#form').trigger('reset')
         $('.counter').text(140)
         var $tweet = createTweetElement(data);
         $('.tweets').prepend($tweet);
      })

    };
});


function loadTweets (){
  $.get( "/tweets/", function( data ) {
    renderTweets(data);
  });
};
loadTweets();

// -----------------------------------------------------------------

$( "#compose" ).click(function() {
  $( ".new-tweet" ).slideToggle( "slow", function() {
    $( "#textarea" ).focus()
  });
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

});