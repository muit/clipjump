require "../source/utyl/utyl.js" if typeof Utyl == "undefined"
SM = require "serve-me"
module.exports =
  class CJ
    @ServeMe : undefined

    constructor: ->
      options = require "./config"
      CJ.ServeMe = SM(options.server)
      server.start (options.env == "development")?3000:80

