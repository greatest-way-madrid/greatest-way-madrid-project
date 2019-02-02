class Map {
  constructor(containerDomElement) {
    this.containerDomElement = containerDomElement;
    this.googleMap = null;
  }

  init() {
    this.googleMap = new google.maps.Map(this.containerDomElement, {
      zoom: 5,
      center: {
        lat: 40.382459,
        lng: -3.702891
      }
    });
  }

  route() {
    
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    const directionRequest = {
      origin: { lat: 41.3977381, lng: 2.190471916},
      destination: { lat: 40.382459, lng: -3.702891 },
      travelMode: 'DRIVING'
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
    
    directionsDisplay.setMap(this.googleMap);
  }

}
