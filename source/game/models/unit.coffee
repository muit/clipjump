class CJ.Unit
  entity = {}
  @app = undefined
  constructor: ->
    @entity = new pc.fw.Entity

  addContext: (context)->
    if !context
      CJ.instance.application.context.root.addChild @entity
    else
      context.addChild @entity

  translate: (x, y, z)->
    @entity.translate x,y,z

  addScript: (name)->
    @script = new pc.fw.ScriptComponent (new pc.fw.ScriptComponentSystem @entity), @entity

    ###
    @entity.addComponent script, {
      scripts: [{
          name: name
      }]
    }
    ###
