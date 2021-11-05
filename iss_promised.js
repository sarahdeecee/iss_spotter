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

const nextISSTimesForMyLocation = (body) => {

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };