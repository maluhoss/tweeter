/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];

  function createTweetElement (tweet) {
    return `<article class="user-tweet">
                      <header>
                        <img id="icon" src="${tweet.user.avatars.small}" alt="ninja-icon" height="60px" width="60px"/>
                        <h2>${tweet.user.name}</h2>
                        <h6>${tweet.user.handle}</h6>
                    </header>
                    <main>
                      <p>${tweet.content.text}</p>
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
      $('#posted-tweets').append($tweet);
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
  // renderTweets(data);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  $("#submit-tweet").submit(function( event ) {
    event.preventDefault();

    if ($(this).find('textarea').val().length === 0 || $(this).find('textarea').val().length > 140) {
      alert("Error! Messages need to have text and be less than 140 characters. Please modify your message.");
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $(this).serialize(),
      })
      .then(loadTweets);
    }
  });

});
