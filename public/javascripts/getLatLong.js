function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map)
      .then(data => {
        window.location = `/directions?origin=${data[0]}&destiny=${data[1]}`;
      })
      .catch(error => console.log(error))
  });
}

function getPoints(address, geocoder, resultsMap) {
  return new Promise(function(resolve, reject) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        resolve([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
      } else {
        reject(alert('Geocode was not successful for the following reason: ' + status));
      }
    });
  })
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

// function geocodeAddress(geocoder, resultsMap) {
//   var origin = document.getElementById('origin').value;
//   var destination = document.getElementById('destination').value;
  
//   var originCoordinates = [];
  
//   geocoder.geocode({'address': origin}, function(results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       var originCoordinates = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
//       var marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
  
//   var destinationCoordinates = geocoder.geocode({'address': destination}, function(results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       var destinationCoords = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
//       var marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//       return destinationCoords;
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });

//   console.log({originCoordinates});

//   return { origin: originCoordinates, destination: destinationCoordinates};
// }