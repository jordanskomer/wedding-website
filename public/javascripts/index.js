$(document).ready(function(){
  animateSVGs();

  rsvpData = {}


  $("form#data").submit(function(){

    var formData = new FormData($(this)[0]);

    $.ajax({
        url: "rsvps.json",
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

  $.ajax({
    url: "rsvps.txt",
    method : "POST",
    dataType: "text",
    data: rsvpData,
    success: function(){}
  });
});

var animateSVGs = function() {
  new Vivus('heart', {
    type: 'delayed',
    duration: 250,
    animTimingFunction: Vivus.EASE_OUT_BOUNCE
  }, new function(){});
};