class CJ.Cube extends CJ.Unit
  constructor: (@id = 1, context)->
    super
    type = CJ.Cube.Types.getById(id);
    CJ.instance.application.context.systems.model.addComponent @entity, {
      type: "box",
      castShadows: true,
      receiveShadows: true
    }
    @addContext context

  setColor: (color)->
    #@instance.color = color

  destroy: ->
    @entity.destroy()

class CJ.Cube.Types
  @all = []

  @add: (id, name, stats)->
    @all[id] = {id: id, name: name, stats: stats}

  @getById: (id) ->
    return @all[id]

  @getByName: (name)->
    results = []
    for type in @all
      if name == type.name
        results.push type
    if results.length > 0
      return results


  # All types of blocks
  @add 0, "Nothing",   undefined
  @add 1, "Blue Box",  undefined
  @add 2, "Green Box", undefined
  @add 3, "Red Box",   undefined
  @add 4, "Player Box",   undefined
