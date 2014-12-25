window.CJ or= {}
class CJ.Unit
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

  rotateLocal: (x,y,z)->
    @entity.rotateLocal x,y,z

  translateLocal: (x, y, z)->
    @entity.translateLocal x,y,z

  setLocalPosition: (x, y, z)->
    @entity.setLocalPosition x,y,z

  setPosition: (x, y, z)->
    @entity.setPosition x,y,z

  getPosition: ->
    return @entity.getPosition()

  getLocalRotation: ->
    return @entity.getLocalRotation()

  getLocalPosition: ->
    return @entity.getLocalPosition()

  lookAt: (x,y,z)->
    if x instanceof CJ.Unit
      pos = x.getPosition()
      @entity.lookAt pos.x,pos.y,pos.z
      return
    @entity.lookAt x,y,z

  addScript: (name, attrs)->
    CJ.Script.add name, this, attrs

  on: (name, callback)->
    if typeof callback != "function"
      CJ.log "This event("+name+") is not a function."
      return
    @events[name] = callback

  call: (name, attrs)->
    if !@events[name]
      CJ.log "This event("+name+") doesnt exist."
      return
    else if typeof @events[name] != "function"
      CJ.log "This event("+name+") is not a function."
      return
    return @events[name](attrs)
