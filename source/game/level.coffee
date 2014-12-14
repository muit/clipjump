class CJ.Level
  @levels = {}
  @add: (level)->
    @levels[level.id] = level

  constructor: (@id)->
