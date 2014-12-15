class CJ.Level
  @list = []
  @add: (level)->
    @list[level.id] = level

  @get: (id)->
    return @list[id]

  constructor: (@id)->

  setBlocks: (@blocks)->
