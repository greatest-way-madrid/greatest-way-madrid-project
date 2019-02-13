const axios = require('axios');

module.exports.getTripInfo = (origin, destination) => {
  const fc = origin.join('|');
  const tc = destination.join('|');
  const url = `https://public-api.blablacar.com/api/v2/trips`;
  
  return axios.get(url, { 
    headers: { 
      accept: 'application/json', 
      key: process.env.BLABLACAR_API_KEY 
    },
    params: {
      locale: 'es_ES',
      _format: 'json',
      cur: 'EUR',
      fc: fc,
      tc: tc
    }
  })
    .then(results => {
      const tripInfo = parseResponse(results);
      return Promise.resolve(tripInfo);
    })
    .catch(error => console.log('Blablacar API Error'));
}

function parseResponse(res) {
  return {
    distance: res.data.trips[0].distance.value,
    duration: (res.data.trips[0].duration.value/60),
    kind: 'blablacar',
    additional: {
      price: res.data.trips[0].price_with_commission.value,
      model: `${res.data.trips[0].car.make} ${res.data.trips[0].car.model}`,
      link: res.data.trips[0].links._front,
    }
  }
}
