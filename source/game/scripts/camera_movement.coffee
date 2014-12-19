CJ.Script.create "camera_movement", ()=>
  class CameraMovement
    constructor: (@camera)->
      @height = 2
      @distance = 5
      @speed = 3

      @degrees = 0
      @y_degrees = 0
      @dir = false # true->right/false->left

    initialize: (attrs)->
      @keyboard = new pc.input.Keyboard document
      @keyboard.on("keydown", @onKeyDown, this);

      @player = attrs.player
      @camera.setLocalPosition 0, @height, @distance
      @camera.lookAt @player.entity.getPosition()

    onKeyDown: (e)->
      if e.key == pc.input.KEY_O
        @degrees -= Math.PI/2
        @dir = false
      else if e.key == pc.input.KEY_P
        @degrees += Math.PI/2
        @dir = true
      else
        return
      @obj_x = @distance*Math.round Math.sin @degrees
      @obj_z = @distance*Math.round Math.cos @degrees

    update: (dt)->
      position = @camera.getLocalPosition()
      x = position.x
      z = position.z
      # Comprobate if the actual position is in the range
      if (@obj_x-0.2 >= x || @obj_x+0.2 <= x) || (@obj_z-0.2 >= z || @obj_z+0.2 <= z)
        @y_degrees = if @dir then @y_degrees + @speed*dt else @y_degrees - @speed*dt
        # New position
        x = @distance*Math.sin @y_degrees
        z = @distance*Math.cos @y_degrees
        @camera.setLocalPosition x, @height, z
        @camera.lookAt @player.entity.getPosition()


  return CameraMovement
