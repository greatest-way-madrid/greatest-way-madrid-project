var Uber = require('node-uber');
var uber = new Uber({
  client_id: process.env.UBER_CLIENT_ID,
  client_secret: process.env.UBER_CLIENT_SECRET,
  server_token: process.env.UBER_SERVER_TOKEN,
  redirect_uri: process.env.REDIRECT_URI,
  name: 'GREATEST_WAY_MADRID',
  language: 'en_US', // optional, defaults to en_US
  sandbox: true // optional, defaults to false
});

module.exports.getPriceAndTime = (origin, destination) => {
  return Promise.all([
    uber.estimates.getPriceForRouteAsync(origin[0], origin[1], destination[0], destination[1]),
    uber.estimates.getETAForLocationAsync(origin[0], origin[1])
  ]).then(results => {
    const tripInfo = parseResponse(results);
    return Promise.resolve(tripInfo);
  })
}

function parseResponse(res) {
  return {
    distance: (parseInt(res[0].prices[0].distance) * 1.60934).toFixed(2),
    duration: (parseInt((res[0].prices[0].duration) / 60)),
    kind: 'uber',
    additional: {
      price: parseInt(res[0].prices[0].estimate.slice(1)),
      eta: parseInt((res[1].times[0].estimate) / 60)
    }
  }
}


