const test = require('tape');
const sinon = require('sinon');
const sinonTest = require('sinon-test');
const giphy = require('./giphy.js');
const request = require('request');

test('tests getImage', t => {
  t.plan(3);
  const pretendReturn = {
    data: [
      {
        images: {
          original: {
            url: 'i am a url',
          },
        },
      }
    ]
  }
  // stub request.get
  const stub = sinon.stub(request, 'get');
  // calling stub.yields calls the first function passed to the stubbed function
  // when that function is called, with the arguments supplied to stub.yields
  // passed to that callback
  stub.yields(null, null, JSON.stringify(pretendReturn));
  // so we call getImage, which does a request.get and then calls the function
  // passed into getImage inside of the callback to request.get (and that
  // callback will be called with the arguments passed to yield). So, we can do
  // our t.equal inside of the callback to getImage, knowing what will be passed
  // into the function that calls it as we have called stub.yield on it
  giphy.getImage('cats', (err, res) => {
    t.equal(res, "i am a url", "tests that when the callback to request gets the expected argument it works properly")
  });

  stub.reset();
  stub.yields(null, null, undefined);

  giphy.getImage('cats', (err, res) => {
    t.ok(err, 'tests that undefined body responses are error handled');
  })

  stub.reset();
  stub.yields(null, null, JSON.stringify({data:[]}));

  giphy.getImage('cats', (err, res) => {
    t.ok(err, 'tests that bad body responses are are error handled');
  })
});
