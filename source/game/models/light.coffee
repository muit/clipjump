class CJ.Light extends CJ.Unit
  constructor: (opts)->
    super
    if !opts
      throw new Error "Light options must be provided."
    opts.color = opts.color || new pc.Color 1,0,0
    opts.type = opts.type || "point"
    opts.radios = opts.radius || 10
    CJ.instance.application.context.systems.model.addComponent @entity opts

  setColor: (color)->
    #@instance.color = color
