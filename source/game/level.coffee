class CJ.Level
  constructor: (@map, attrs)->

  load: ->

  reset: ->
    for entity in @map.entity._children
      entity.destroy()

  update: (dt)->
