CJ.Script.create "camera_movement", ()=>
  class CameraMovement
    constructor: (@camera)->
      @rads = 0
      @y_rads = 0
      @dir = false # true->right/false->left

    initialize: (attrs)->
      #Attributes
      @height   = attrs.height or 2
      @distance = attrs.distance or 10
      @speed    = attrs.speed or 3
      @player   = attrs.player

      @keyboard = new pc.input.Keyboard document
      @keyboard.on "keydown", @onKeyDown, this
      @camera.setLocalPosition 0, @height, @distance
      @camera.lookAt @player

    onKeyDown: (e)->
      if e.key == pc.input.KEY_O
        @rads -= Math.PI/2
        @dir = false
      else if e.key == pc.input.KEY_P
        @rads += Math.PI/2
        @dir = true
      else
        return
      @obj_x = @distance*Math.round Math.sin @rads
      @obj_z = @distance*Math.round Math.cos @rads

      @player.call "flip_controls", @dir

    update: (dt)->
      position = @camera.getLocalPosition()
      x = position.x
      z = position.z
      # Comprobate if the actual position is in the range
      if (@obj_x-0.5 >= x || @obj_x+0.5 <= x) || (@obj_z-0.5 >= z || @obj_z+0.5 <= z)
        @y_rads = if @dir then @y_rads + @speed*dt else @y_rads - @speed*dt
        # New position
        x = @distance*Math.sin @y_rads
        z = @distance*Math.cos @y_rads
        @camera.setLocalPosition x, @height, z
        @camera.lookAt @player


  return CameraMovement
