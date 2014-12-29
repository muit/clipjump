CJ.Script.create "spawn_animation", ()=>
  class SpawnAnimation
    constructor: (@unit)->
      @speed = 4.5
      @height = 4

      @delta = Math.abs(@height)

    initialize: ->
      @pos_0 = @unit.getPosition()
      @unit.translate 0, @height, 0

    update: (dt)->
      # BUG: Need to use (or implement) a local translation
      if @delta > 0
        amount = @speed*dt
        @delta -= amount
        @unit.translate 0, (if @height>0 then -amount else amount), 0
      else if @unit.getPosition().y != @pos_0.y
        @unit.removeScript "spawn_animation"

    onStop: ->
      @unit.setPosition @pos_0


  return SpawnAnimation
