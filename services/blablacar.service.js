const axios = require('axios');

module.exports.getTripInfo = (origin, destination) => {
  axios({
    method: 'get',
    url: 'https://public-api.blablacar.com/api/v2/trips?key=2d7fa84b3da144a9979faada69866c2d',
    data: {
      _format: 'json',
      locale: 'es_ES',
      cur: 'EUR',
      limit: 1,
      fc: origin.join(','),
      tc: destination.join(',')
    }
  }).then(results => {
    const tripInfo = results;
    console.log(tripInfo);
    return Promise.resolve(tripInfo);
  }).catch(error => console.log('Blablacar API Error'));
}

function parseResponse(res) {
  return {
    distance: (parseInt(res[0].prices[0].distance) * 1.60934).toFixed(2),
    duration: (parseInt((res[0].prices[0].duration) / 60)),
    kind: 'blablacar',
    additional: {
      price: parseInt(res[0].prices[0].estimate.slice(1)),
      eta: parseInt((res[1].times[0].estimate) / 60)
    }
  }
}
