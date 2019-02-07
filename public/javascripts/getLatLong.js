function initMap() {
  
  window.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: { lat: 40.441138, lng: -3.708895 }
  });
  var geocoder = new google.maps.Geocoder();

  var originInput = document.getElementById('origin');
  var destinationInput = document.getElementById('destination');
  
  new google.maps.places.Autocomplete(originInput);
  new google.maps.places.Autocomplete(destinationInput);
  
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
        resolve([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
      } else {
        reject(alert('Geocode was not successful for the following reason: ' + status));
      }
    });
  })
}




