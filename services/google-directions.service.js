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
    const transitResDirections = parseResponse(transitRes);
    const drivingResDirections = parseResponse(drivingRes);
    const bicyclingResDirections = parseResponse(bicyclingRes);
    const walkingResDirections = parseResponse(walkingRes);
    return Promise.resolve({
      transit: transitResDirections,
      driving: drivingResDirections,
      bicycling: bicyclingResDirections,
      walking: walkingResDirections
    });
  })
}

function parseResponse(res) {
  return {
    origin: {
      address: res.json.routes[0].legs[0].start_address,
      location: [res.json.routes[0].legs[0].start_location.lat, res.json.routes[0].legs[0].start_location.lng]
    },
    destination: {
      address: res.json.routes[0].legs[0].end_address,
      location: [res.json.routes[0].legs[0].end_location.lat, res.json.routes[0].legs[0].end_location.lng]
    },
    distance: res.json.routes[0].legs[0].distance.text,
    duration: res.json.routes[0].legs[0].duration.text,
    arrivalTime: res.json.routes[0].legs[0].arrival_time
  }
}

