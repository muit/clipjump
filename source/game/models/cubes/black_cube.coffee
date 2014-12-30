class CJ.Cube.Black extends CJ.Cube
  constructor: (context, attrs)->
    super 8, context, attrs
    @setColor new pc.Color 0.3,0.3,0.3
