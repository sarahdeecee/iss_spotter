const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => { 
  let ip = JSON.parse(body).ip;
  return request('https://freegeoip.app/json/' + ip);
}

const fetchISSFlyOverTimes = (body) => { 
  // let latitude = JSON.parse(body).latitude;
  // let longitude = JSON.parse(body).longitude;
  const { latitude, longitude } = JSON.parse(body);
  let coords = { longitude, latitude };
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);
}

const printFlyOverTimes = (body) => {
  let data = JSON.parse(body);
  let flyoverTimes = data.response;
  for (let flyover of flyoverTimes) {
    let date = new Date(flyover.risetime * 1000);
    let seconds = flyover.duration;
    console.log(`Next pass at ${date} for ${seconds} seconds!`);
  }
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(printFlyOverTimes)
    .catch((error) => console.log(error.message));
}

module.exports = { nextISSTimesForMyLocation };