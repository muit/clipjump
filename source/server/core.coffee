require "../source/utyl/utyl.js" if typeof Utyl == "undefined"
SM = require "serve-me"
module.exports =
  class CJ
    constructor: (attr)->
      if attr.env == "production"
        port = process.env.PORT or 8080
      else
        port = 3000
      Config.server.debug = if attr.env == "production" then false else true

      @http_server = SM Config.server
      @http_server.start port
