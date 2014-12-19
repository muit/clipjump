class CJ.Unit
  entity = {}
  @app = undefined
  constructor: ->
    @entity or= new pc.fw.Entity
    @events or= {}

  addContext: (context)->
    if !context
      CJ.instance.application.context.root.addChild @entity
    else
      context.addChild @entity

  translate: (x, y, z)->
    @entity.translate x,y,z

  translateLocal: (x, y, z)->
    @entity.translateLocal x,y,z

  setLocalPosition: (x, y, z)->
    @entity.setLocalPosition x,y,z

  setPosition: (x, y, z)->
    @entity.setPosition x,y,z

  getLocalRotation: ->
    return @entity.getLocalRotation()

  lookAt: (x,y,z)->
    @entity.lookAt x,y,z

  addScript: (name, attrs)->
    CJ.Script.add name, @entity, attrs


  on: (name, callback)->
    @events[name] = callback

  call: (name, attrs)->
    return @events[name](attrs)
