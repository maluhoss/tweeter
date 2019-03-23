/*Character Counter in Footer of New Tweet using difference between max length and text length.
difference greater than 0 (message under 140): Show character count and remove negative class if applied.
difference less than 0 (message over 140): Show character count and add negative class to activate red font */
$(document).ready(function() {
  $(".new-tweet textarea").keyup(function() {
    const max = 140;
    let length = max - $(this).val().length;

    if (length >= 0) {
      $(".new-tweet .counter").text(length)
      $(".new-tweet .counter").removeClass("negative");
    } else {
      $(".new-tweet .counter").addClass("negative");
      $(".new-tweet .counter").text(length);
    }
  })
});