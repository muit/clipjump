(function(){var CJ,Config,SM;Config={env:"development",server:{home:"index.html",directory:"./public",debug:!0,log:!0,secure:!1}},"undefined"==typeof Utyl&&require("../source/utyl/utyl.js"),SM=require("serve-me"),module.exports=CJ=function(){function CJ(env){var port;port=env===!0?process.env.PORT||8080:3e3,Config.server.debug=env===!0?!1:!0,this.http_server=SM(Config.server),this.http_server.start(port)}return CJ}()}).call(this);