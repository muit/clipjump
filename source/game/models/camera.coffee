class CJ.Camera extends CJ.Unit
  constructor: (context, color)->
    super
    CJ.instance.application.context.systems.camera.addComponent @entity, {
      clearColor: if color then color else new pc.Color 0.6, 0.6, 0.6
    }
    @addContext context
