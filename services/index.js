const googleDirectionsService = require('./google-directions.service');

require('dotenv').config();

const origin = [40.382459, -3.702891];
const destiny = [40.393312, -3.693448];

googleDirectionsService.find(origin, destiny)
  .then(route => {
    console.log(route);
  })
  .catch(error => {
    console.log(error);
    // next(error);
  })