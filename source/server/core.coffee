require "../source/utyl/utyl.js" if typeof Utyl == "undefined"
SM = require "serve-me"
module.exports =
  class CJ
    constructor: (env)->
      port = if env == true then process.env.PORT or 8080 else 3000
      Config.server.debug = if env == true then false else true
      @http_server = SM Config.server

      @http_server.start port
