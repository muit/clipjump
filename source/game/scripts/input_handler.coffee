CJ.Script.create "input_handler", ()=>
  class InputHandler
    constructor: (@unit)->
      @speed = 3
      @movements = ['forward', 'left', 'back', 'right']

    initialize: ->
      @controller = new pc.input.Controller document
      @controller.registerKeys 'forward', [pc.input.KEY_UP, pc.input.KEY_W]
      @controller.registerKeys 'back',    [pc.input.KEY_DOWN, pc.input.KEY_S]
      @controller.registerKeys 'left',    [pc.input.KEY_LEFT, pc.input.KEY_A]
      @controller.registerKeys 'right',   [pc.input.KEY_RIGHT, pc.input.KEY_D]
      @controller.registerKeys 'jump',    [pc.input.KEY_SPACE]
      self = this
      @unit.on "flip_controls", (direction)=>
        if direction == true
          self.movements.getLastFlip()
        else if direction == false
          self.movements.getNextFlip()

    update: (dt)->
      z = 0
      if @controller.isPressed @movements[0]
        z = -1
      else if @controller.isPressed @movements[2]
        z = 1
      x = 0
      if @controller.isPressed @movements[1]
        x = -1
      else if @controller.isPressed @movements[3]
        x = 1

      @unit.translate x*@speed*dt, 0, z*@speed*dt

  return InputHandler
