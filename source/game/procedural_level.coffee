class CJ.ProceduralLevel extends CJ.Level
  constructor: (attrs)->
    attrs or= {}
    @seed = attrs.seed or String.random()
    @range = attrs.range or 8

  initialize: ->
    Math.seedrandom @seed


  update: (dt)->
