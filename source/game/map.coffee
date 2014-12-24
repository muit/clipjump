class CJ.Map
  constructor: ->
    @entity = new pc.fw.Entity
    CJ.instance.application.context.root.addChild @entity

  load: (@level) ->
    for z, plane of @level.blocks
      for x, line of plane
        for y, cubeId of line
          if cubeId != 0
            cube = CJ.Cube.new cubeId, @entity
            cube.translate x, y, z

  reset: ->
    for entity in map.entity._children
      entity.destroy()



