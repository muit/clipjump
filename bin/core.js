(function(){var CJ,Config,SM;Config={env:"development",server:{port:3e3,home:"index.html",directory:"./public",debug:!0,log:!0,secure:!1}},"undefined"==typeof Utyl&&require("../source/utyl/utyl.js"),SM=require("serve-me"),module.exports=CJ=function(){function CJ(){this.http_server=SM(Config.server),this.http_server.start("development"===Config.env?3e3:80)}return CJ}()}).call(this);