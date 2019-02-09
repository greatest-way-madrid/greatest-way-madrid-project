function initialize() {
  var originInput = document.getElementById('origin');
  var destinationInput = document.getElementById('destination');
  
  new google.maps.places.Autocomplete(originInput);
  new google.maps.places.Autocomplete(destinationInput);
}


