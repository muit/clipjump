class CJ.Level.map_0 extends CJ.Level
  load: ->
    for z, plane of @blocks
      for x, line of plane
        for y, cubeId of line
          if cubeId != 0
            cube = CJ.Cube.new cubeId, @map.entity
            cube.translate x, y, z

  constructor: (map, attrs)->
    super map
    @blocks =
      0:
        0:
          0: 1
        1:
          0: 1
        2:
          0: 1
        3:
          0: 1
        4:
          0: 1
        5:
          0: 1
        6:
          0: 1
        7:
          0: 1
      1:
        0:
          0: 1
        1:
          0: 1
        2:
          0: 1
        3:
          0: 1
        4:
          0: 1
        5:
          0: 1
        6:
          0: 1
        7:
          0: 1
      2:
        0:
          0: 1
        1:
          0: 1
        2:
          0: 1
        3:
          0: 1
        4:
          0: 1
        5:
          0: 1
        6:
          0: 1
        7:
          0: 1
      3:
        0:
          0: 1
        1:
          0: 1
        2:
          0: 1
          1: 3
        3:
          0: 1
        4:
          0: 1
        5:
          0: 1
        6:
          0: 1
        7:
          0: 1
      4:
        0:
          0: 1
        1:
          0: 1
        2:
          0: 1
        3:
          0: 1
          1: 2
        4:
          0: 1
        5:
          0: 1
        6:
          0: 1
        7:
          0: 1
      5:
        0:
          0: 1
        1:
          0: 1
        2:
          0: 1
        3:
          0: 1
        4:
          0: 1
        5:
          0: 1
        6:
          0: 1
        7:
          0: 1
      6:
        0:
          0: 1
        1:
          0: 1
        2:
          0: 1
        3:
          0: 1
        4:
          0: 1
        5:
          0: 1
        6:
          0: 1
        7:
          0: 1
      7:
        0:
          0: 1
        1:
          0: 1
        2:
          0: 1
        3:
          0: 1
        4:
          0: 1
        5:
          0: 1
        6:
          0: 1
        7:
          0: 1
