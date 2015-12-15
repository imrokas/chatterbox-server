var headers = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
	"access-control-allow-headers": "content-type, accept", //X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept
	"access-control-max-age": 10, // Seconds.
	"Content-Type": "application/json"
};

var sendResponse = function(response, data, statusCode, contentType) {
	statusCode = statusCode || 200;
	if (contentType) {
	  headers['Content-Type'] = contentType;
	  response.writeHead(statusCode, headers);
		response.end(data);
	}
	headers['Content-Type'] = "application/json";
	response.writeHead(statusCode, headers);
	response.end(JSON.stringify({'results': data}));
};

var objectId = 1;
var messages = [{
	text: 'Hello there!',
	username: 'imrokas',
	roomname: 'lobby'
}];

var actions = {
	'GET': function(request, response) {
		sendResponse(response, messages);
	},
	'POST': function(request, response) {
		var data = "";
		request.on("data", function(chunk){
			data += chunk;
		});
		request.on("end", function(){
			var msg = JSON.parse(data);
			msg['objectId'] = objectId++;
			messages.push(msg);
			sendResponse(response, messages, 201); 
		});
	},
	'OPTIONS': function(request, response) {
		sendResponse(response, null);
	},
};

var requestHandler = function(request, response) {
	if( actions[request.method]) {
		actions[request.method](request, response);
	} else {
		sendResponse(response, null, 404);
	}
	
};


exports.requestHandler = requestHandler;
exports.sendResponse = sendResponse;