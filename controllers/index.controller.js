const googleDirectionsService = require('../services/google-directions.service');

module.exports.mainController = (req, res, next) => {
  res.render('index');
}

module.exports.printDirections = (req, res, next) => {
  let origin = req.query.origin.split(',');
  let destination = req.query.destiny.split(',');
  googleDirectionsService.find(origin, destination)
  .then(route => {
    console.log(route);
    res.render('index', {
      originDriving: route.driving[0].origin.address,
      destinationDriving: route.driving[0].destination.address,
      distanceDriving: route.driving[0].distance,
      durationDriving: route.driving[0].duration,
      originTransit: route.transit[0].origin.address,
      destinationTransit: route.transit[0].destination.address,
      distanceTransit: route.transit[0].distance,
      durationTransit: route.transit[0].duration
     }); 
  })
  .catch(error => {
    next(error);
  })
}

