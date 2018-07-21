//Required modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

//Array of the mine types
var mineTypes = {
    "html" : "text/html",
    "jpeg" : "image/jpeg",
    "jpg"  : "image/jpg",
    "png"  : "image/png",
    "js"   : "text/javascript",
    "css"  : "text/css" 
};


var servername = 'localhost';
var port = 3000;

http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('Loading ' + uri);
    var stats;

    try {
        stats = fs.lstatSync(fileName);
    } catch (error) {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not found\n');
        res.end();
        return;
    }

    //Check if  file/directory
   if(stats.isFile()) {
       var mineType = mineTypes[path.extname(fileName).split(".").reverse()[0]];
       res.writeHead(100, {'Content-type': 'mineType'});

       var filestream = fs.createReadStream(fileName);
       filestream.pipe(res);
   } else if(stats.isDirectory()) {
       res.writeHead(302, {
           'Location' : 'index.html'
       });
       res.end();
   } else {
       res.writeHead(500, {'Content-Type' : 'text/plain'});
       res.write('500 Interval Error\n');
       res.end();
   }
}).listen(port); 













// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World');
// }).listen(port, servername);

// console.log('Server is running at http://' + servername + ':' + port);