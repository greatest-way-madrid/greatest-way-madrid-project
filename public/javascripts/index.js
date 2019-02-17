const $driving = $('#driving');
const $transit = $('#transit');
const $uber = $('#uber');
const $bicycling = $('#bicycling');
const $walking = $('#walking');
const $blablacar = $('#blablacar');

function addCardListeners(originLat, originLng, destinationLat, destinationLng) {
  $driving.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
  });

  $transit.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'TRANSIT');
  });

  $uber.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
  });

  $bicycling.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'BICYCLING');
  });

  $walking.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'WALKING');
  });

  $blablacar.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
  });
}

function removeActiveClass() {
  $('.card-active').removeClass('card-active');
}

function removeRoute() {
  directionsDisplay.setMap(null);
}

function addRoute(originLat, originLng, destinationLat, destinationLng, tripMode) {
  
  window.directionsService = new google.maps.DirectionsService;
  window.directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: 'red'
    }
  });

  const directionRequest = {
    origin: { lat: originLat, lng: originLng },
    destination: { lat: destinationLat, lng: destinationLng },
    travelMode: tripMode
  };
  directionsService.route(
    directionRequest,
    function (response, status) {
      if (status === 'OK') {
        // everything is ok
        directionsDisplay.setDirections(response);
      } else {
        // something went wrong
        window.alert('Directions request failed due to ' + status);
      }
    }
  );
  directionsDisplay.setMap(window.map);
}
