CJ.Script.create "camera_movement", ()=>
  class CameraMovement
    constructor: (@camera)->
      @distance_y = 1
      @distance_x = 1
      @speed = 3

      @degrees = 0

    initialize: (attrs)->
      @keyboard = new pc.input.Keyboard
      @player = attrs.player
      @camera.translateLocal 0,2,5

    update: (dt)->
      if @keyboard.wasPressed pc.input.KEY_O
        @degrees -= 90
      else if @keyboard.wasPressed pc.input.KEY_P
        @degrees += 90

      @camera.lookAt @player.entity.getPosition()

  return CameraMovement
