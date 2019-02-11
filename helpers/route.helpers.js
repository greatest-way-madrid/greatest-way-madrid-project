module.exports = (hbs) => {
  hbs.registerHelper('get-img-src', (trip) => {
      switch(trip.kind) {
          case 'driving': return '/images/car.png'; break;
          case 'transit': return '/images/train.png'; break;
          case 'bicycling': return '/images/bicycle.png'; break;
          case 'walking': return '/images/trekking.png'; break;
          case 'uber': return '/images/car.png'; break;
      }
  });
}