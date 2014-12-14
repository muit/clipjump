class CJ.Unit
  entity = {}
  constructor: ->
    @entity = new pc.fw.Entity

  translate: (x, y, z)->
    @entity.translate x,y,z
