const http = require('https');
var request = require('request');
var fs = require('fs');

/** OPTIONS */
const options = {
  method: 'POST',
  hostname: 'api.sirv.com',
  path: '/v2/token',
  headers: {
    'content-type': 'application/json',
  },
};

/** CONSTANTS */
const clientId = 'Y8RAps9BOIM1tHbD08ckui9jP3S';
const clientSecret =
  'ampkbdac0pq/2YOArq3RIf5F96k+AYaHrgXXKMXhirNb1Pc9WNnCKJ0ZNOG+GTYyT0zNX6LTdyk/ZgjtW0LUBA==';
let token = '';
// let apiResponse = null;
// let body = 'jkjk';

const req = http.request(options, (res) => {
  const chunks = [];

  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = Buffer.concat(chunks);
    const apiResponse = JSON.parse(body.toString());
    // console.log('body: ', apiResponse);
    upload(apiResponse.token);
    //console.log('token:', apiResponse.token);
    //console.log('expiresIn:', apiResponse.expiresIn);
    //console.log('scope:', apiResponse.scope);
  });
});

req.write(
  JSON.stringify({
    clientId,
    clientSecret,
  }),
);

req.end();

/** UPLOAD */
function upload(token) {
  // console.log('token: ', token);

  fs.readFile('./test.jpg', (err, data) => {
    if (err) throw err;

    var options = {
      method: 'POST',
      url: 'https://api.sirv.com/v2/files/upload',
      qs: { filename: '/test_2121233.jpg' },
      headers: {
        'content-type': 'image/jpeg',
        authorization: `Bearer ${token}`,
      },
      body: data,
    };
    // console.log(data);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // console.log('body: ', body);
      console.log(response.request);
    });
  });
}
