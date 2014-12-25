class CJ.Map extends CJ.Unit
  constructor: (level, attrs)->
    super
    @addContext()
    if level
      @load level, attrs

  load: (level, attrs) ->
    @level = new level this, attrs
    @level.load()

  reset: ->
    @level.reset()

  update: (dt)->
    @level.update dt





