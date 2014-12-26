class CJ.Level.ProceduralLevel extends CJ.Level
  constructor: (map, attrs)->
    super map
    attrs or= {}
    @seed = attrs.seed or String.random()
    @ranges = []

  initialize: ->
    Math.seedrandom @seed
    @noise = new Noise 1, 1, 0.01, -10, 10, @seed

  update: (dt)->
    for range in @ranges
      range.update dt, renderNewBlocks

  addRange: (type, attrs)->
    range_class = CJ.Level.ProceduralLevel[type]
    if !range_class
      throw new Error "The range "+type+" does not exist."
    @ranges.push new range_class attrs

  renderNewBlocks: (blocks)->
    for block in blocks
      if surface[block.x] == undefined || surface[block.x][block.y] == undefined
        surface[block.x][block.y] = @noise.get block.x, block.y


class CJ.Level.ProceduralLevel.CircularRange
  constructor: (attrs)->
    @player = attrs.player
    @range = attrs.range or 8

  update: (dt, callback)->
    p_position = @player.getPosition()
    center = new Vector2 Math.round(p_position.x), Math.round(p_position.y)
    if center.distance @center != 0
      @center = center
      callback obtainBlocks()

  obtainBlocks: ->
    blocks = [@center]
    # Circular blocks with range
    return blocks


class CJ.Level.ProceduralLevel.SquareRange
  constructor: (attrs)->
    @player = attrs.player
    @range = attrs.range or 8

  update: (dt, callback)->
    p_position = @player.getPosition()
    center = new Vector2 Math.round(p_position.x), Math.round(p_position.y)
    if center.distance @center != 0
      @center = center
      callback obtainBlocks()

  obtainBlocks: ->
    blocks = []
    for x in [@center.x-@range..@center.x+@range]
      for y in [@center.y-@range..@center.y+@range]
        blocks.push new Vector2(x, y)
    return blocks;

