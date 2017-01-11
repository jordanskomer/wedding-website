$(document).ready(function(){
  // animateSVGs();
  initMap();

  $("a").click(function(){
    removeUnderlines();
    $(this).next().addClass("active");
  });

  $('.header-link').on('click', function() {
    document.querySelector("#" + this.firstElementChild.dataset.link).scrollIntoView({ behavior: 'smooth' });
  });

  new Waypoint.Inview({
    element: document.getElementById('main'),
    exit: function(direction) {
      removeUnderlines();
    }
  });
  new Waypoint.Inview({
    element: document.getElementById('our-story'),
    exit: function(direction) {
      removeUnderlines();
      $('.underline').eq(0).addClass("active");
    }
  });
  new Waypoint.Inview({
    element: document.getElementById('rsvp'),
    exit: function(direction) {
      removeUnderlines();
      $('.underline').eq(1).addClass("active");
    }
  });
  new Waypoint.Inview({
    element: document.getElementById('details'),
    exit: function(direction) {
      removeUnderlines();
      $('.underline').eq(2).addClass("active");
    }
  });
  new Waypoint.Inview({
    element: document.getElementById('registry'),
    exit: function(direction) {
      removeUnderlines();
      $('.underline').eq(3).addClass("active");
    }
  });
  new Waypoint.Inview({
    element: document.getElementById('gallery'),
    exit: function(direction) {
      removeUnderlines();
      $('.underline').eq(4).addClass("active");
    }
  });
});

(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: ($(this).offset().top - 80) + 'px'
        }, 'fast');
        return this;
    }
})(jQuery);

var removeUnderlines = function() {
  $('.underline').removeClass("active");
};

var initMap = function() {
  var thistle_hill = {lat: 32.737900, lng: -97.342419};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 32.739001, lng: -97.342430},
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: false,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5e2ff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#a5e2ff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  });
  var marker = new google.maps.Marker({
    position: thistle_hill,
    map: map
  });
};



var animateSVGs = function() {
  new Vivus('heart', {
    start: 'autostart',
    type: 'oneByOne',
    duration: 250,
    animTimingFunction: Vivus.EASE_OUT
  }, vivuscallback);
};