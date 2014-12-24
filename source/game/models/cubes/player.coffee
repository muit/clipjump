class CJ.Player extends CJ.Cube
  constructor: (context)->
    super 4, context
    CJ.instance.application.context.systems.rigidbody.addComponent(@entity, {
        type: "dynamic",
        mass: 50,
        restitution: 0.5
    });
    @setColor new pc.Color 0.5411,0.9215,0.9490
