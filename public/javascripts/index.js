$(document).ready(function(){

  setupHeaderUnderlines();

  $(".image, .js-text").unveil(0, function() {
    $(this).load(function() {
      this.style.opacity = 1;
    });
  });

  $(".form-input").keydown(function(e) {
      if(e.which == 13 || e.which == 9) {
        e.preventDefault();
        if($(this).attr("name") == "sig_last_name"){
          submitForm();
        } else {
          nextFormInput();
        }
      }
  });

  $(".form-input").focus(function(e) {
    $("label[for='" + $(this).attr("name") + "']").addClass("active");
  });

  $(".js-next").click(function(){
    if ($(".form-input.active").val() != "") {
      nextFormInput();
    } else {
      $("label[for='" + $(".form-input.active").attr("name") + "']").text("Please fill in this field");
    }
  });

  $(".js-prev").click(function(){
    prevFormInput();
  });

  $("#going-yes").click(function(e){
    e.preventDefault();
    $("#js-going").val("yes");
    nextFormInput();
  });

  $("#going-no").click(function(e){
    e.preventDefault();
    $("#js-going").val("no");
    submitForm();
  });

  $(".js-attending").click(function(e) {
    e.preventDefault();
    $("#js-attending").val($(this).data("value"));
    submitForm();
  })

  $("a").click(function(){
    removeUnderlines();
    $(this).next().addClass("active");
  });

  $(".js-reveal").on("click", function(){
    $(this).addClass("active");
    $("#mobile-nav").addClass("active");
  });

  $(".js-nav-link").on("click", function() {
    $(".js-reveal").removeClass("active");
    document.querySelector("#" + this.dataset.link).scrollIntoView({ behavior: 'smooth' });
  });

  $('.header-link').on('click', function() {
    document.querySelector("#" + this.firstElementChild.dataset.link).scrollIntoView({ behavior: 'smooth' });
  });

  $(".view-more").click(function() {
    $("#our-story p").addClass("show");
  });
});

var setupHeaderUnderlines = function() {
  var controller = new ScrollMagic.Controller();

  var ourStoryDuration = document.getElementById('our-story').clientHeight,
      rsvpDuration = document.getElementById('rsvp').clientHeight,
      detailsDuration = document.getElementById('details').clientHeight,
      registryDuration = document.getElementById('registry').clientHeight


  var ourStoryScene = new ScrollMagic.Scene({
      triggerElement: "#our-story",
      duration: ourStoryDuration
  }).setClassToggle("#our-story-underline", "active").addTo(controller);

  var scene = new ScrollMagic.Scene({
      triggerElement: "#rsvp",
      duration: rsvpDuration
  }).setClassToggle("#rsvp-underline", "active").addTo(controller);

  var scene = new ScrollMagic.Scene({
      triggerElement: "#details",
      duration: detailsDuration
  }).setClassToggle("#details-underline", "active").addTo(controller);

  var scene = new ScrollMagic.Scene({
      triggerElement: "#registry",
      duration: registryDuration
  }).setClassToggle("#registry-underline", "active").addTo(controller);

  var scene = new ScrollMagic.Scene({
      triggerElement: "#gallery",
  }).setClassToggle("#gallery-underline", "active").addTo(controller);
};

var setupGalleryGrid = function() {
  $(".grid").boxify();
};

var submitForm = function() {
  $("#rsvp").addClass("completed");
  $("#rsvp .header-title").addClass("hide");
  $('.form-submit-text').text("Thanks!");
  $(".form-content.active").removeClass("active");
  $('.form-submit-text').addClass("active");
  postForm();
};

var removeUnderlines = function() {
  $('.underline').removeClass("active");
};

var postForm = function() {
  $.ajax({
    type: "POST",
    url: "/",
    timeout: 2000,
    data: $(".form").serializeArray()
  });
};

var nextFormInput = function() {
  currentForm = $(".form-content.active");
  currentForm.removeClass("active");
  if (!currentForm.next().is("button")) {
    currentForm.next().addClass("active");
    currentForm.next().children()[1].focus();
  } else {
    submitForm();
  }
};

var prevFormInput = function() {
  currentForm = $(".form-content.active");
  if (currentForm.prev().length != 0) {
    currentForm.removeClass("active");
    currentForm.prev().addClass("active");
    currentForm.prev().children()[1].focus();
  }
};