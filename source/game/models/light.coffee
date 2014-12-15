class CJ.Light extends CJ.Unit
  constructor: (opts)->
    super
    if !opts
      throw new Error "Light options must be provided."
    opts.color = opts.color || new pc.Color 1,0,0
    opts.type = opts.type || "point"
    opts.radius = opts.radius || 10
    CJ.instance.application.context.systems.light.addComponent @entity, opts
    @addContext()

  setColor: (color)->
    #@instance.color = color
