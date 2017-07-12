const request = require('request');

function getImage(searchParam, callback) {
  const url = `https://api.giphy.com/v1/gifs/search?q=${searchParam}&limit=1&api_key=dc6zaTOxFJmzC`;
  request.get(url, (err, res, body) => {
    const parsedBody = body ? JSON.parse(body) : undefined;
    if (!parsedBody ||
        !parsedBody.data ||
        !parsedBody.data[0] ||
        !parsedBody.data[0].images ||
        !parsedBody.data[0].images.original ||
        !parsedBody.data[0].images.original.url) {
      return callback(new Error('Sorry, no results.'));
    }
    const imageUrl = parsedBody.data[0].images.original.url;
    callback(null, imageUrl);
  });
}

module.exports = {
  getImage,
};
