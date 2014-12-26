class CJ.Cube.Red extends CJ.Cube
  constructor: (context, attrs)->
    super 3, context, attrs
    @setColor new pc.Color 1,0,0
