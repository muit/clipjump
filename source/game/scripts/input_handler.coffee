pc.script.create "keyboard_handler", (context) =>
  class KeyboardHandler
    constructor: (@entity)->

    initialize: ->
      @controller = new pc.input.Controller document
      @controller.registerKeys('forward', [pc.input.KEY_UP, pc.input.KEY_W]);
      @controller.registerKeys('back',    [pc.input.KEY_DOWN, pc.input.KEY_S]);
      @controller.registerKeys('left',    [pc.input.KEY_LEFT, pc.input.KEY_A]);
      @controller.registerKeys('right',   [pc.input.KEY_RIGHT, pc.input.KEY_D]);
      @controller.registerKeys('jump',    [pc.input.KEY_SPACE]);

    update: (dt)->
      x = 0
      z = 0
      if @controller.wasPressed 'forward'
        z = 1
      else if @controller.wasPressed 'back'
        z = -1

      if @controller.wasPressed 'left'
        x = 1
      else if @controller.wasPressed 'right'
        x = -1

      @entity.translate x, 0, z

  return KeyboardHandler
