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
      case 'uber': return new hbs.SafeString('<p class="list-group-item">ETA: ' + trip.additional.eta + ' mins</p><p class="list-group-item">Estimated price: ' + trip.additional.price + ' €</p><a href="https://m.uber.com/ul/" class="btn btn-danger">Uber App</a>');
      case 'blablacar': return new hbs.SafeString('<p class="list-group-item">Estimated price: ' + trip.additional.price + ' €</p><p class="list-group-item">Car model: ' + trip.additional.model + ' </p><a href="' + trip.additional.link + '" class="btn btn-danger">Trip link</a>');
    }
  });
}