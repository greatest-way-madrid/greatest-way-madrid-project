const googleDirectionsService = require('../services/google-directions.service');
const uberService = require('../services/uber.service');
const blablacarService = require('../services/blablacar.service');

module.exports.mainController = (req, res, next) => {
  res.render('index');
}

module.exports.printDirections = (req, res, next) => {
  let origin = req.query.origin.split(',');
  let destination = req.query.destiny.split(',');
  let mode = req.query.mode;
  Promise.all([
    googleDirectionsService.find(origin, destination),
    uberService.getPriceAndTime(origin, destination),
    blablacarService.getTripInfo(origin, destination)
  ]).then((trips) => {
    // Google brings 5 elements: 4 trips and 1 directions
    // 4 trips goes to tripsArr with 1 trip of Uber
    const directions = trips[0][4];
    trips[0].pop();
    trips = [...trips[0], trips[1], trips[2]];
    tripsArr = parseTripsArray(trips, mode);
    res.render('index', {
      originLat: origin[0],
      originLng: origin[1],
      destinationLat: destination[0],
      destinationLng: destination[1],
      originAddress: directions[0],
      destinationAddress: directions[1],
      tripMode: mode,
      trips: tripsArr
    });
  })
    .catch(error => {
      next(error);
    })
}

let parseTripsArray = (trips, mode) => {
  trips = trips.filter((trip) => trip !== undefined);
  if (mode === 'fastest') {
    return trips.sort((trip1, trip2) => {
      return trip1.duration - trip2.duration
    });
  }
  if (mode === 'shortest') {
    return trips.sort((trip1, trip2) => {
      return trip1.distance - trip2.distance
    });
  }
  if (mode === 'healthiest') {
    return trips.sort((trip1, trip2) => {
      if (trip1.additional.kcal && trip2.additional.kcal) {
        return trip2.additional.kcal - trip1.additional.kcal;
      } else if (trip1.kind === 'transit' && !trip2.additional.kcal) {
        return -1;
      } else if (trip1.kind === 'uber' && !trip2.additional.kcal) {
        return -1;
      } else if (trip1.additional.kcal && !trip2.additional.kcal) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
