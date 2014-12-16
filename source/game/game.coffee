###**************************************************************************
****                        Game Api for ClipJump                        ****
*****************************************************************************
****                                                                     ****
****          @author Miguel Fernandez - muitxer - github.com/muit       ****
**************************************************************************###

window.CJ or= {};
CJ.log = (message)->
  console.log "ClipJump: "+message

class CJ.Game
  application = {}

  constructor: ->
    CJ.instance = this

    @canvas = document.getElementById "canvas"
    @application = new pc.fw.Application @canvas
    @onload()

  onload: ->
    @application.start()
    #Screen Setup
    @application.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
    @application.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

    #Load Map
    @map = new CJ.Map
    @map.load CJ.Level.get 0

    light = new CJ.Light {
      type: "point",
      castShadows: true
    }
    light.translate 2,2,2

    #Add Player
    @player = new CJ.Player
    @player.translate 1,1,1
    @player.addScript "input_handler"


    #Camera
    @camera = new pc.fw.Entity
    @application.context.systems.camera.addComponent @camera, {
      clearColor: new pc.Color 0.6, 0.6, 0.6
    }
    @application.context.root.addChild(@camera);
    @camera.translate 2, 2, 10
    @camera.lookAt 2, 0, 0

    @application.on "update", @update


  onunload: ->

  update: (dt)->
    CJ.Script.update dt

  error: (message) ->
    throw new Error message
