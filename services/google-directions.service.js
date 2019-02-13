const googleMaps = require('@google/maps');
const client = googleMaps.createClient({
  key: process.env.GOOGLE_DIRECTIONS_API_KEY,
  Promise: Promise
});

module.exports.find = (origin, destination) => {
  const query = {
    origin: origin,
    destination: destination
  }
  return Promise.all([
    client.directions({ ...query, mode: 'transit' }).asPromise(),
    client.directions({ ...query, mode: 'driving' }).asPromise(),
    client.directions({ ...query, mode: 'bicycling' }).asPromise(),
    client.directions({ ...query, mode: 'walking' }).asPromise()
  ]).then(([transitRes, drivingRes, bicyclingRes, walkingRes]) => {
    const drivingResDirections = parseResponse(drivingRes, 'driving');
    const transitResDirections = parseResponse(transitRes, 'transit');
    const bicyclingResDirections = parseResponse(bicyclingRes, 'bicycling');
    const walkingResDirections = parseResponse(walkingRes, 'walking');
    const resDirections = parseDirections(drivingRes);
    return Promise.resolve([drivingResDirections, transitResDirections, bicyclingResDirections, walkingResDirections, resDirections]);
  })
}

function parseResponse(res, kind) {
  const response = {
    distance: stringToKm(res.json.routes[0].legs[0].distance.text),
    duration: stringToMinutes(res.json.routes[0].legs[0].duration.text),
    kind: kind,
    additional: {}
  }
  if (kind === 'bicycling') {
    response.additional.kcal = (7.5 * response.duration).toFixed(2);
  }
  if (kind === 'walking') {
    response.additional.kcal = (4.1 * response.duration).toFixed(2);
  }
  return response;
}

function parseDirections (res) {
  return [res.json.routes[0].legs[0].start_address, res.json.routes[0].legs[0].end_address];
}

function stringToMinutes (str) {
  let mins = 0;
  if (str.includes('d')) {
    mins = parseInt(str.split(' ')[0]*1440 + (str.split(' ')[2])*60);
  } else if (str.includes('h')) {
    mins = parseInt(str.split(' ')[0])*60 + parseInt(str.split(' ')[2]);
  } else {
    mins = parseInt(str.split(" ")[0]);
  }
  return mins;

}

function stringToKm (str) {
  let km = 0;
  if (str.includes(' m')) {
    km = (parseInt(str.split(' ')[0])/1000).toFixed(2);
  } else if (str.includes(',')) {
    km = parseInt(str.replace(',','').split(' ')).toFixed(2);
  } else {
    km = parseInt(str.split(" ")[0]).toFixed(2);
  }
  return km;
}