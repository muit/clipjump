class CJ.Level.ProceduralLevel extends CJ.Level
  constructor: (map, attrs)->
    super map
    attrs or= {}
    @seed = attrs.seed or String.random()
    @ranges = []
    @surface = []
    @noise = new Noise 1, 1, 0.1, -2, 2, @seed


  initialize: ->
    Math.seedrandom @seed

  update: (dt)->
    self = this
    for range in @ranges
      range.update dt, (blocks)=>
        self.renderNewBlocks blocks

  addPlayer: (player)->
    @addRange "SquareRange", {player: player}

  addRange: (type, attrs)->
    range_class = CJ.Level.ProceduralLevel[type]
    if !range_class
      throw new Error "The range "+type+" does not exist."
    range = new range_class attrs
    @ranges.push range
    @renderNewBlocks range.obtainBlocks()

  renderNewBlocks: (blocks)->
    for block in blocks
      if @surface[block.x] == undefined
        @surface[block.x] = []

      if @surface[block.x][block.y] == undefined
        @surface[block.x][block.y] = cube = new CJ.Cube.Blue undefined, {castShadows: false}
        cube.translate block.x, @noise.get(block.x, block.y), block.y
        #cube.addScript "spawn_animation"


class CJ.Level.ProceduralLevel.CircularRange
  constructor: (attrs)->
    @player = attrs.player
    @range = attrs.range or 8
    p_position = @player.getPosition()
    @center = new Vector2 Math.round(p_position.x), Math.round(p_position.z)

  update: (dt, callback)->
    p_position = @player.getPosition()
    center = new Vector2 Math.round(p_position.x), Math.round(p_position.z)
    if (center.distance @center) != 0
      @center = center
      callback @obtainBlocks()

  obtainBlocks: ->
    blocks = [@center]
    # Circular blocks with range
    return blocks


class CJ.Level.ProceduralLevel.SquareRange
  constructor: (attrs)->
    @player = attrs.player
    @range = attrs.range or 8
    p_position = @player.getPosition()
    @center = new Vector2 Math.round(p_position.x), Math.round(p_position.z)

  update: (dt, callback)->
    p_position = @player.getPosition()
    center = new Vector2 Math.round(p_position.x), Math.round(p_position.z)

    if (center.distance @center) != 0
      @center = center
      callback @obtainBlocks()

  obtainBlocks: ->
    blocks = []
    for x in [@center.x-@range..@center.x+@range]
      for y in [@center.y-@range..@center.y+@range]
        blocks.push new Vector2(x, y)
    return blocks;

