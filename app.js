const qs = require('querystring')
//const fs = require('fs')

const http = require('http');
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.method==="POST") {
    console.log("received post request")
    var body = '';

    // hi

    req.on('data', function (data) {
        body += data;
        console.log("data="+data)
        //if (data=="NEW") { fs.mkdir("test") }

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            req.connection.destroy();
    });
    
    console.log("thedata="+data)
    
    req.on('end', function () {
        var post = qs.parse(body);
        console.log(post);
    });

    res.end()
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
  }
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});
