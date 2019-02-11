function addRoute(originLat, originLng, destinationLat, destinationLng, tripMode) {

  window.directionsService = new google.maps.DirectionsService;
  window.directionsDisplay = new google.maps.DirectionsRenderer;

  const directionRequest = {
    origin: { lat: originLat, lng: originLng},
    destination: { lat: destinationLat, lng: destinationLng},
    travelMode: tripMode
  };
  directionsService.route(
    directionRequest,
    function(response, status) {
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

function removeRoute() {
  directionsDisplay.setMap(null);
}

function removeActiveClass() {
  document.getElementById('driving').classList.remove('bg-light');
  document.getElementById('transit').classList.remove('bg-light');
  document.getElementById('uber').classList.remove('bg-light');
  document.getElementById('bicycling').classList.remove('bg-light');
  document.getElementById('walking').classList.remove('bg-light');
  document.getElementById('driving').classList.remove('card-active');
  document.getElementById('transit').classList.remove('card-active');
  document.getElementById('uber').classList.remove('card-active');
  document.getElementById('bicycling').classList.remove('card-active');
  document.getElementById('walking').classList.remove('card-active');
}

function addListeners (originLat, originLng, destinationLat, destinationLng) {
  document.getElementById('driving').addEventListener('click', function () {
    removeActiveClass();
    removeRoute();
    this.classList.add('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
  });
  document.getElementById('transit').addEventListener('click', function () {
    removeActiveClass();
    removeRoute();
    this.classList.add('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'TRANSIT');
  });
  document.getElementById('uber').addEventListener('click', function () {
    removeRoute();
    removeActiveClass();
    this.classList.add('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
  });
  document.getElementById('bicycling').addEventListener('click', function () {
    removeActiveClass();
    removeRoute();
    this.classList.add('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'BICYCLING');
  });
  document.getElementById('walking').addEventListener('click', function () {
    removeActiveClass();
    removeRoute();
    this.classList.add('card-active');
    addRoute(originLat, originLng, destinationLat, destinationLng, 'WALKING');
  });
}

