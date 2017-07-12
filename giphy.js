const request = require('request');

function getImage(searchParam, callback) {
  const url = `https://api.giphy.com/v1/gifs/search?q=${searchParam}&limit=1&api_key=dc6zaTOxFJmzC`
  request(url, (err, res, body) => {
    const imageUrl = JSON.parse(body).data[0].images.original.url;
    callback(null, imageUrl);
  });
}

getImage('hello', (err, result) => {
  if(err) return console.log('ERROR: ', err);
  console.log(result);
})
