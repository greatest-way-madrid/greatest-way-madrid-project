module.exports = (hbs) => {
  hbs.registerHelper('get-img-src', (trip) => {
    switch (trip.kind) {
      case 'driving': return '/images/car.png'; break;
      case 'transit': return '/images/train.png'; break;
      case 'bicycling': return '/images/bicycle.png'; break;
      case 'walking': return '/images/trekking.png'; break;
      case 'uber': return '/images/uber.png'; break;
      case 'blablacar': return 'images/blablacar.png'; break;
    }
  });
  hbs.registerHelper('get-additional-info', (trip) => {
    switch (trip.kind) {
      case 'walking':
      case 'bicycling': return new hbs.SafeString('<p class="list-group-item">Kcal burned: ' + trip.additional.kcal + '</p>');
      case 'uber': return new hbs.SafeString('<p class="list-group-item">ETA: ' + trip.additional.eta + ' mins</p><p class="list-group-item">Estimated price: ' + trip.additional.price + ' €</p><a href="https://m.uber.com/ul/" class="btn btn-salmon list-group-item">Uber App</a>');
      case 'blablacar': return new hbs.SafeString('<p class="list-group-item">Departure date: ' + trip.additional.departure + '<p class="list-group-item">Estimated price: ' + trip.additional.price + ' €</p><p class="list-group-item">Car model: ' + trip.additional.model + ' </p><a href="' + trip.additional.link + '" class="btn btn-salmon list-group-item">Trip link</a>');
    }
  });
  hbs.registerHelper('get-trip-duration', (trip) => {
    if (trip.duration > 60) {
      if (trip.duration % 60 === 0) {
        return `${Math.floor(trip.duration / 60)} h`;
      } else {
          return `${Math.floor(trip.duration / 60)} h ${Math.floor(trip.duration % 60)} mins`;
      }
    } else {
        return `${trip.duration} mins`;
    }
  })
  hbs.registerHelper('get-src-icon', (trip) => {
    switch (trip.kind) {
      case 'driving': return 'fas fa-car'; break;
      case 'transit': return 'fas fa-subway'; break;
      case 'bicycling': return 'fas fa-bicycle'; break;
      case 'walking': return 'fas fa-walking'; break;
      case 'uber': return 'fab fa-uber'; break;
      case 'blablacar': return 'fas fa-car'; break;
    }
  })
}