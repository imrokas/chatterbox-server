var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept", //X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var handleResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify({'results': data}));
};

var objectId = 1;
var messages = [];
var urls = ["/classes/messages", "/classes/room1", "/classes/chatterbox/"];

var actions = {
  'GET': function(request, response) {
    handleResponse(response, messages);
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
      handleResponse(response, messages, 201); 
    });
  },
  'OPTIONS': function(request, response) {
    handleResponse(response, null);
  },
};

var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  if( actions[request.method] && urls.indexOf(request.url) !== -1 ) {
    actions[request.method](request, response);
  } else {
    handleResponse(response, null, 404);
  }
  
};


exports.requestHandler = requestHandler;
