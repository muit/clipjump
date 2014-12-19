CJ.Script.create "input_handler", ()=>
  class InputHandler
    constructor: (@unit)->
      @speed = 3

    initialize: ->
      @controller = new pc.input.Controller document
      @controller.registerKeys 'forward', [pc.input.KEY_UP, pc.input.KEY_W]
      @controller.registerKeys 'back',    [pc.input.KEY_DOWN, pc.input.KEY_S]
      @controller.registerKeys 'left',    [pc.input.KEY_LEFT, pc.input.KEY_A]
      @controller.registerKeys 'right',   [pc.input.KEY_RIGHT, pc.input.KEY_D]
      @controller.registerKeys 'jump',    [pc.input.KEY_SPACE]
      @unit.on "flip_controls", @onFlipControls

    update: (dt)->
      z = 0
      if @controller.isPressed 'forward'
        z = -1
      else if @controller.isPressed 'back'
        z = 1
      x = 0
      if @controller.isPressed 'left'
        x = -1
      else if @controller.isPressed 'right'
        x = 1

      @unit.translate x*@speed*dt, 0, z*@speed*dt

    onFlipControls: (direction)->
      

  return InputHandler