var http = require("http");
var url = require('url');
var fs = require('fs');
var handleRequest = require("./request-handler");

var port = 3000;
var ip = "127.0.0.1";
var paths = {
	"/" : function(request, response) {
		readFile(request, response, "/../client/index.html", function(res, data) {
			handleRequest.sendResponse(res, data, 200, "text/html");
		});
	},
	"/styles/styles.css" : function(request, response) {
		readFile(request, response, "/../client/styles/styles.css", function(res, data) {
			handleRequest.sendResponse(res, data, 200, "text/css");
		});
	},
	"/bower_components/jquery/jquery.min.js" : function(request, response) {
		readFile(request, response, "/../client/bower_components/jquery/jquery.min.js", function(res, data) {
			handleRequest.sendResponse(res, data, 200, "text/html");
		});
	},
	"/bower_components/underscore/underscore-min.js" : function(request, response) {
		readFile(request, response, "/../client/bower_components/underscore/underscore-min.js", function(res, data) {
			handleRequest.sendResponse(res, data, 200, "text/html");
		});
	},
	"/scripts/app.js" : function(request, response) {
		readFile(request, response, "/../client/scripts/app.js", function(res, data) {
			handleRequest.sendResponse(res, data, 200, "text/html");
		});
	},
	"/images/spiffygif_46x46.gif" : function(request, response) {
		readFile(request, response, "/../client/images/spiffygif_46x46.gif", function(res, data) {
			handleRequest.sendResponse(res, data, 200, "text/html");
		});
	},
	"/classes/messages" : function(request, response) { handleRequest.requestHandler(request, response); }, // for the test cases
	"/classes/room1": function(request, response) { handleRequest.requestHandler(request, response); }, 		// for the test cases
	"/classes/chatterbox/": function(request, response) { handleRequest.requestHandler(request, response); }
};

var server = http.createServer(function(request, response){
	var path = url.parse(request.url).pathname;
	console.log("Serving request type %s for url %s", request.method, request.url);
	if(paths[path]) {
		paths[path](request, response);
	}
	else {
		handleRequest.sendResponse(response, 'Not Found', 404);
	}
});

server.listen(port, ip, function() {
	console.log("Listening on http://%s:%s", ip, port);
});

var readFile = function(req, res, fileName, cb) {
	fs.readFile(__dirname + fileName, function (err,data) {
		console.log('file: %s', __dirname + fileName);
	    if (err) {
	      handleRequest.sendResponse(res, 'Not Found', 404);
	    }
	    cb(res, data);
	  });
}
