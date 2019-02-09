const googleDirectionsService = require('../services/google-directions.service');
const uberService = require('../services/uber.service');

module.exports.mainController = (req, res, next) => {
  res.render('index');
}

module.exports.printDirections = (req, res, next) => {
  let origin = req.query.origin.split(',');
  let destination = req.query.destiny.split(',');

  Promise.all([
    googleDirectionsService.find(origin, destination),
    uberService.getPriceAndTime(origin, destination)
  ]).then(([gRoute, uberRoute]) => {
    res.render('index', {
      originLat: origin[0],
      originLng: origin[1],
      destinationLat: destination[0],
      destinationLng: destination[1],

      originDriving: gRoute.driving.origin.address,
      destinationDriving: gRoute.driving.destination.address,
      distanceDriving: gRoute.driving.distance,
      durationDriving: gRoute.driving.duration,

      originTransit: gRoute.transit.origin.address,
      destinationTransit: gRoute.transit.destination.address,
      distanceTransit: gRoute.transit.distance,
      durationTransit: gRoute.transit.duration,

      estimatedPriceUber: uberRoute.estimatedPrice,
      estimatedDistanceUber: uberRoute.estimatedDistance,
      estimatedDurationUber: uberRoute.estimatedDuration,
      estimatedETAUber: uberRoute.estimatedETA,

      originBicycling: gRoute.bicycling.origin.address,
      destinationBicycling: gRoute.bicycling.destination.address,
      distanceBicycling: gRoute.bicycling.distance,
      durationBicycling: gRoute.bicycling.duration,
      kcalBicycling: minsToKcalBicycling(gRoute.bicycling.duration),

      originWalking: gRoute.walking.origin.address,
      destinationWalking: gRoute.walking.destination.address,
      distanceWalking: gRoute.walking.distance,
      durationWalking: gRoute.walking.duration,
      kcalWalking: minsToKcalWalking(gRoute.walking.duration),
    });
  })
    .catch(error => {
      next(error);
    })
}

function minsToKcalBicycling (duration) {
  let mins = 0;
  if (duration.includes('hour')) {
    mins = parseInt(duration.split(' ')[0])*60 + parseInt(duration.split(' ')[2]);
    return mins * 7.5;
  } else { 
    mins = parseInt(duration.split(" ")[0]).toFixed(1);
    return mins * 7.5;
  }
}

function minsToKcalWalking (duration) {
  let mins = 0;
  if (duration.includes('hour')) {
    mins = parseInt(duration.split(' ')[0])*60 + parseInt(duration.split(' ')[2]);
    return mins * 4.1;
  } else { 
    mins = parseInt(duration.split(" ")[0]);
    return (mins * 4.1);
  }
}