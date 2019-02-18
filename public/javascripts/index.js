const $driving = $('#driving');
const $transit = $('#transit');
const $uber = $('#uber');
const $bicycling = $('#bicycling');
const $walking = $('#walking');
const $blablacar = $('#blablacar');

function addCardListeners(originLat, originLng, destinationLat, destinationLng) {
  hideBoxInfo();
  $driving.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
    addInfoBox('driving');
  });

  $transit.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'TRANSIT');
    addInfoBox('transit');
  });

  $uber.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
    addInfoBox('uber');
  });

  $bicycling.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'BICYCLING');
    addInfoBox('bicycling');
  });

  $walking.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'WALKING');
    addInfoBox('walking');
  });

  $blablacar.click(function() {
    removeActiveClass();
    removeRoute();
    $(this).addClass('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
    addInfoBox('blablacar');
  });
}

function activeKindButton (mode) {
  if (mode === 'fastest') {
    $('#fastest').removeClass('btn-bottom').addClass('btn-salmon');
  }
  if (mode === 'shortest') {
    $('#fastest').removeClass('btn-salmon').addClass('btn-bottom');
    $('#shortest').removeClass('btn-bottom').addClass('btn-salmon');
  }
  if (mode === 'healthiest') {
    $('#fastest').removeClass('btn-salmon').addClass('btn-bottom');
    $('#healthy').removeClass('btn-bottom').addClass('btn-salmon');
  }
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
      strokeColor: '#F87060'
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

function addInfoBox (transport) {
  switch (transport) {
    case 'driving': hideBoxInfo(); $('.box-driving').show(); break;
    case 'transit': hideBoxInfo(); $('.box-transit').show(); break;
    case 'uber': hideBoxInfo(); $('.box-uber').show(); break;
    case 'bicycling': hideBoxInfo(); $('.box-bicycling').show(); break;
    case 'walking': hideBoxInfo(); $('.box-walking').show(); break;
    case 'blablacar': hideBoxInfo(); $('.box-blablacar').show(); break;
  }
}

function hideBoxInfo () {
  $('.box-info').hide();
}