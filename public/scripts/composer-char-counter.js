$(document).ready(function() {

  $(".new-tweet .tweet").keyup(function(){
    const max = 140;
    let length = max - $(this).val().length;

    if (length >= 0) {
      $(".new-tweet .counter").text(length)
      $(".new-tweet .counter").removeClass("negative");
    } else {
      $(".new-tweet .counter").addClass("negative");
      $(".new-tweet .counter").text(length);
    }
  });
});