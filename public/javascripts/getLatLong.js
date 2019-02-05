function initMap() {
  
  window.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: { lat: 40.441138, lng: -3.708895 }
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function () {
    geocodeAddress(geocoder, map)
      .then(data => {
        origin = data[0];
        destination = data[1];
        window.location = `/directions?origin=${data[0]}&destiny=${data[1]}`;
      })
      .catch(error => console.log(error))
  });
}

function geocodeAddress(geocoder, resultsMap) {
  return new Promise(function (resolve, reject) {
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;

    const originLocation = getPoints(origin, geocoder, resultsMap);
    const destinationLocation = getPoints(destination, geocoder, resultsMap);

    Promise.all([originLocation, destinationLocation])
      .then(results => resolve(results))
      .catch(error => reject(error));
  });
}

function getPoints(address, geocoder, resultsMap) {
  return new Promise(function (resolve, reject) {
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        resolve([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
      } else {
        reject(alert('Geocode was not successful for the following reason: ' + status));
      }
    });
  })
}

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
  document.getElementById('bicycling').addEventListener('click', function () {
    removeRoute();
    addRoute(originLat, originLng, destinationLat, destinationLng, 'BICYCLING');
  });
  document.getElementById('walking').addEventListener('click', function () {
    removeRoute();
    addRoute(originLat, originLng, destinationLat, destinationLng, 'WALKING');
  });
}


