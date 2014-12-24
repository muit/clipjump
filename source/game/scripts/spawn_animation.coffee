CJ.Script.create "spawn_animation", ()=>
  class SpawnAnimation
    constructor: (@unit)->
      @speed = 4.5
      @height = 4

      @delta = Math.abs(@height)

    initialize: ->
      @y_0 = @unit.getPosition().y
      @unit.translate 0, @height, 0

    update: (dt)->
      if @delta > 0
        amount = @speed*dt
        @delta -= amount
        @unit.translate 0, (if @height>0 then -amount else amount), 0
      else if @unit.getPosition().y != @y_0
        @unit.translate 0,-@unit.getPosition().y-@y_0,0

  return SpawnAnimation
