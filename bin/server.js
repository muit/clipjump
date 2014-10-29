/*****************************************************************************
 ****                      Clip Engine for ThreeJs                        ****
 *****************************************************************************
 ****                                                                     ****
 ****          @author Miguel Fernandez - muitxer - github.com/muit       ****
 ****************************************************************************/

if(typeof Utyl == "undefined") require("../source/utyl/utyl.js");

/*******************************
 * HTTP SERVER
********************************/
var port = 8080;
var options = {
    home: "index.html",
    directory: "./public",
    debug: true,
    secure: false
};

var ServeMe = require("serve-me")(options);

var webServer = ServeMe.start(port);
