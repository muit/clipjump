class CJ.Cube extends CJ.Unit
  constructor: (@id = 1, context)->
    super
    type = CJ.Cube.Types.getById(id);
    CJ.instance.application.context.systems.model.addComponent @entity, {
      type: "box",
      castShadows: true,
      receiveShadows: true
    }

    CJ.instance.application.context.systems.collision.addComponent(@entity, {
        type: "box",
        halfExtents: new pc.Vec3(0.5, 0.5, 0.5)
    });
    @addContext context

  setColor: (color)->
    material = new pc.scene.PhongMaterial
    material.diffuse = color
    material.update()
    @entity.model.material = material


  destroy: ->
    @entity.destroy()

  @new: (id, attrs)->
    r_class = (CJ.Cube.Types.getClass CJ.Cube.Types.getById id)
    return new r_class attrs


class CJ.Cube.Types
  @_all = []

  @add: (id, name, r_class, stats)->
    @_all[id] = {id: id, name: name, stats: stats, r_class: r_class}

  @getById: (id) ->
    return @_all[id]

  @getByName: (name)->
    results = []
    for type in @_all
      if name == type.name
        results.push type
    if results.length > 0
      return results

  @getByClass: (r_class)->
    results = []
    for type in @_all
      if r_class == type.r_class
        results.push type
    if results.length > 0
      return results

  @getClass: (type)->
    return CJ.Cube[type.r_class]

  # _all types of blocks
  @add 0, "Nothing",    undefined, undefined
  @add 1, "Blue Box",   "Blue",    undefined
  @add 2, "Green Box",  "Green",   undefined
  @add 3, "Red Box",    "Red",     undefined
  @add 4, "Player Box", "Player",  undefined
  @add 5, "Point Box",  "Point",   undefined
  @add 6, "End Box",    "End",     undefined
