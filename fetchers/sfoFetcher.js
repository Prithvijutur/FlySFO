var http = require('http');

var SFOFetcher = {};
SFOFetcher.name = 'sfoFetcher';


SFOFetcher.read = function (callback) {

  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  var options = {
    host: 'www.random.org',
    path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  };

  var get = function(response) {console.error('calling fetcher');
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);
      callback();
    });
  }

  var req = http.request(options, get);
  req.end();
}

module.exports = SFOFetcher;