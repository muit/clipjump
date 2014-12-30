class CJ.Player extends CJ.Cube
  constructor: (context)->
    super 4, context,
      rigidbody:
        type: "dynamic",
        mass: 1,
        restitution: 0

    @setColor new pc.Color 0.5411,0.9215,0.9490


