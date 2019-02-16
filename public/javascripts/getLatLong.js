function initMap() {

  window.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: { lat: 40.441138, lng: -3.708895 },
    disableDefaultUI: true,
    styles: [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 13
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#144b53"
          },
          {
            "lightness": 14
          },
          {
            "weight": 1.4
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#08304b"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0c4152"
          },
          {
            "lightness": 5
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0b434f"
          },
          {
            "lightness": 25
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0b3d51"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "color": "#146474"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#021019"
          }
        ]
      }
    ]
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
        window.location = `/directions?origin=${data[0]}&destiny=${data[1]}&mode=fastest`;
      })
      .catch(error => console.log(error))
  });
  document.getElementById('fastest').addEventListener('click', function () {
    geocodeAddress(geocoder, map)
      .then(data => {
        origin = data[0];
        destination = data[1];
        window.location = `/directions?origin=${data[0]}&destiny=${data[1]}&mode=fastest`;
      })
      .catch(error => console.log(error))
  });
  document.getElementById('shortest').addEventListener('click', function () {
    geocodeAddress(geocoder, map)
      .then(data => {
        origin = data[0];
        destination = data[1];
        window.location = `/directions?origin=${data[0]}&destiny=${data[1]}&mode=shortest`;
      })
      .catch(error => console.log(error))
  });
  document.getElementById('healthy').addEventListener('click', function () {
    geocodeAddress(geocoder, map)
      .then(data => {
        origin = data[0];
        destination = data[1];
        window.location = `/directions?origin=${data[0]}&destiny=${data[1]}&mode=healthiest`;
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




