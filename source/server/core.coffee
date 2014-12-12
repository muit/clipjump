require "../source/utyl/utyl.js" if typeof Utyl == "undefined"
SM = require "serve-me"
module.exports =
  class CJ

    constructor: ->
      @http_server = SM(Config.server)
      @http_server.start(if Config.env == "development" then 3000 else 80)
