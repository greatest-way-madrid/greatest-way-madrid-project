module.exports = (hbs) => {
  hbs.registerHelper('get-additional-info', (trip) => {
    switch (trip.kind) {
      case 'driving': return new hbs.SafeString('<p class="list-group-item"><i class="fas fa-route"></i> Route by ' + trip.additional.summary + '</p>');
      case 'walking': return new hbs.SafeString('<p class="list-group-item"><i class="fas fa-route"></i> Route by ' + trip.additional.summary + '</p><p class="list-group-item"><i class="fas fa-fire"></i> Kcal burned: ' + trip.additional.kcal + '</p>');
      case 'bicycling': return new hbs.SafeString('<p class="list-group-item"><i class="fas fa-route"></i> Route by ' + trip.additional.summary + '</p><p class="list-group-item"><i class="fas fa-fire"></i> Kcal burned: ' + trip.additional.kcal + '</p>');
      case 'uber': return new hbs.SafeString('<p class="list-group-item"><i class="far fa-hand-paper"></i> ETA: ' + trip.additional.eta + ' mins</p><p class="list-group-item"><i class="fas fa-euro-sign"></i> Estimated price: ' + trip.additional.price + ' €</p><a href="https://m.uber.com/ul/" class="btn btn-salmon list-group-item" target="_blank">Uber App</a>');
      case 'blablacar': return new hbs.SafeString('<p class="list-group-item"><i class="far fa-clock"></i> Departure date: ' + trip.additional.departure + '<p class="list-group-item"><i class="fas fa-euro-sign"></i> Estimated price: ' + trip.additional.price + ' €</p><p class="list-group-item"><i class="fas fa-car-side"></i> Car model: ' + trip.additional.model + ' </p><a href="' + trip.additional.link + '" class="btn btn-salmon list-group-item" target="_blank">Trip link</a>');
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
      case 'blablacar': return 'fas fa-shuttle-van'; break;
    }
  })
  hbs.registerHelper('sort-by', (mode) => {
    switch (mode) {
      case 'fastest': return ('Sorted by Trip Time'); break;
      case 'shortest': return ('Sorted by Distance'); break;
      case 'healthiest': return ('Sorted by Kcal'); break;
    }
  })
}