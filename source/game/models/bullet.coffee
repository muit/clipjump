CJ.Model or= {}
class CJ.Model.Bullet extends CJ.Unit
  constructor: (context)->
    super
    CJ.instance.application.context.systems.model.addComponent @entity, {
      type: "box",
      castShadows: true,
      receiveShadows: true
    }
    @entity.setLocalScale 0.3, 0.1, 0.1
    @addContext context
