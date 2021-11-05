//require and run our main fetch function
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, flyoverTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let flyover of flyoverTimes) {
    let date = new Date(flyover.risetime * 1000);
    let seconds = flyover.duration;
    console.log(`Next pass at ${date} for ${seconds} seconds!`);
  }
});