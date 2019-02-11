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
  ]).then((trips) => {
    const directions = trips[0][4];
    trips[0].pop();
    const tripsArr = [...trips[0], trips[1]];
    tripsArr.filter((trip) => trip !== undefined)
      .sort((trip1, trip2) => {
        return trip1.duration - trip2.duration
      });
    res.render('index', {
      originLat: origin[0],
      originLng: origin[1],
      destinationLat: destination[0],
      destinationLng: destination[1],
      originAddress: directions[0],
      destinationAddress: directions[1],
      trips: tripsArr
    });
  })
    .catch(error => {
      next(error);
    })
}
