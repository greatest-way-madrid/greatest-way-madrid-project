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

function addListeners (originLat, originLng, destinationLat, destinationLng) {
  document.getElementById('driving').addEventListener('click', function () {
    removeRoute();
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
  });
  document.getElementById('transit').addEventListener('click', function () {
    removeRoute();
    addRoute(originLat, originLng, destinationLat, destinationLng, 'TRANSIT');
  });
  document.getElementById('uber').addEventListener('click', function () {
    removeRoute();
    addRoute(originLat, originLng, destinationLat, destinationLng, 'DRIVING');
  });
  document.getElementById('bicycling').addEventListener('click', function () {
    removeRoute();
    addRoute(originLat, originLng, destinationLat, destinationLng, 'BICYCLING');
  });
  document.getElementById('walking').addEventListener('click', function () {
    removeRoute();
    addRoute(originLat, originLng, destinationLat, destinationLng, 'WALKING');
  });
}