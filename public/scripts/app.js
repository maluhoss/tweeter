/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  $('textarea').focus();

  //FOR A FUN TIME. COMMENT THIS BACK IN//

  // $('textarea').focus(function() {
  //     $("#ring-girl").show();
  //     setTimeout(function() { $("#ring-girl").hide(); }, 1000);
  //   })


  //    $('textarea').focus();

      $('#ring-girl').hide();



  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement (tweet) {
    return `<article class="user-tweet">
                      <header>
                        <img id="icon" src="${tweet.user.avatars.small}" alt="ninja-icon" height="60px" width="60px"/>
                        <h2>${tweet.user.name}</h2>
                        <h6>${tweet.user.handle}</h6>
                    </header>
                    <main>
                      <p>${escape(tweet.content.text)}</p>
                    </main>
                    <footer>
                      <h6>${tweet.created_at} ago</h6>
                      <i class="fas fa-heart"></i>
                      <i class="fas fa-retweet"></i>
                      <i class="fas fa-flag"></i>
                    </footer>
                  </article>`;
  }


  function renderTweets(tweets) {
    $('#posted-tweets').empty();

    tweets.forEach(function(tweet) {
      var $tweet = createTweetElement(tweet);
      $('#posted-tweets').prepend($tweet);
    });
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
  };

  function loadTweets() {
      $.ajax({
       url: "/tweets",
       type: "GET"
      })
      .then(renderTweets)
    }

  loadTweets();

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  $("#submit-tweet").submit(function( event ) {
    event.preventDefault();

    if ($(this).find('textarea').val().length === 0 || $(this).find('textarea').val().length > 140) {
      $(".c-validation").slideDown();
      $(".c-validation").text("Error! Messages need to have text and be less than 140 characters. Please modify your message.");
    } else {
      $(".c-validation").hide(350);
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $(this).serialize(),
      })
      .then(loadTweets)
      .then(function() {
        $('textarea').val("").trigger("keyup");
      })
    }
  });

  $(".toggle-button").on("click", function(event) {
    $(".new-tweet").slideToggle('moderate');
    $('textarea').focus()
  });

});
