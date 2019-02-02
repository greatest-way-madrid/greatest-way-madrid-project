const googleMaps = require('@google/maps');
const client = googleMaps.createClient({
  key: GOOGLE_DIRECTIONS_API_KEY,
  Promise: Promise
});


module.exports.find = (origin, destination) => {
  const query = {
    origin: origin,
    destination: destination
  }
  return Promise.all([
    client.directions({ ...query, mode: 'transit' }).asPromise(),
    client.directions({ ...query, mode: 'driving' }).asPromise()
  ]).then(([transitRes, drivingRes]) => {
    const transitDirections =parseDrivingResponse(transitRes);
    const drivingResDirections = parseDrivingResponse(drivingRes);
    
    return Promise.resolve({
      transit: transitDirections,
      driving: drivingResDirections
    });
  })
}

function parseDrivingResponse(res) {
  return res.json.routes[0].legs.map((leg) => {
    console.log(leg);
    return {
      origin: {
        address: leg.start_address,
        location: [leg.start_location.lat, leg.start_location.lng]
      },
      destination: {
        address: leg.end_address,
        location: [leg.end_location.lat, leg.end_location.lng]
      }
    }
  });
}

