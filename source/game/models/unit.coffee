class CJ.Unit
  entity = {}
  @app = undefined
  constructor: ->
    @entity = new pc.fw.Entity

  addContext: ->
    CJ.instance.application.context.root.addChild @entity

  translate: (x, y, z)->
    @entity.translate x,y,z
