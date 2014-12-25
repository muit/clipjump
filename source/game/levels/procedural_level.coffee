class CJ.Level.ProceduralLevel extends CJ.Level
  constructor: (map, attrs)->
    super map
    attrs or= {}
    @seed = attrs.seed or String.random()
    @range = attrs.range or 8

  initialize: ->
    Math.seedrandom @seed


  update: (dt)->
