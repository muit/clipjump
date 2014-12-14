class CJ.Cube extends CJ.Unit
  constructor: ->
    super
    CJ.instance.application.context.systems.model.addComponent @entity, {
      type: "box",
    }

  setColor: (color)->
    #@instance.color = color
