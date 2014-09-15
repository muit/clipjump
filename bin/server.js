if(typeof Utyl == "undefined") require("../source/utyl/utyl.js");
http = require("../source/serveMe/source/http_server.js");

//*******************************
// HTTP SERVER
// Only server the html & other files
//*******************************
var port = 80;
var options = {
    home: "index.html",
    debug: true,
    secure: false
};

webServer = http.start(port, options);
