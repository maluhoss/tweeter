
$(document).ready(function() {

/*Hide New Tweet upon page load*/
  $(".new-tweet").hide();

  //FOR A FUN TIME. COMMENT THIS BACK IN//

  // $('textarea').focus(function() {
  //   $("#ring-girl").show();
  //   setTimeout(function() { $("#ring-girl").hide(); }, 1000);
  //  })

  //  $('textarea').focus();

  $("#ring-girl").hide();

/*Function to encode text to prevent cross-site scripting*/
  function escape(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

/*Function to create new Tweet*/
  function createTweetElement (tweet) {
    return `<article class="user-tweet">
                      <header>
                        <img id="icon" src="${tweet.user.avatars.small}" alt="user-avatar" height="60px" width="60px"/>
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
  };

/*Function to add New Tweet to Posted Tweets Section*/
  function renderTweets(tweets) {
    $("#posted-tweets").empty();

    tweets.forEach(function(tweet) {
      var $tweet = createTweetElement(tweet);
      $("#posted-tweets").prepend($tweet);
    });
  };

/*Function to show all Post Tweets by sending a GET request and showing all tweets*/
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      type: "GET"
    })
      .then(renderTweets);
  };

  loadTweets();

/*Behaviour after clicking Tweet button in New Tweet section:
  -if text area has no characters or >140 characters, show error message
  -if text area < 140 characters, send post request and load all Tweets including new tweets
  -text area and character count resume to default*/
  $("#submit-tweet").submit(function(event) {
    event.preventDefault();

    if ($(this).find("textarea").val().length === 0 || $(this).find("textarea").val().length > 140) {
      $(".c-validation").slideDown();
      $(".c-validation").text("Error! Messages need to have text and be less than 140 characters. Please modify your message.");
    } else {
      $(".c-validation").slideUp(300);
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
      })
      .then(loadTweets)
      .then(function() {
        $("textarea").val("").trigger("keyup");
      })
    };
  });

/*Behaviour of Toggle Compose Button in Nav Bar
  - slide down and show new tweet section + Autofocus in text area
  - slide up and hide new tweet section */
  $(".toggle-button").on("click", function(event) {
    $(".new-tweet").slideToggle("moderate");
    $("textarea").focus()
  });

});
