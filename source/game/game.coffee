###**************************************************************************
****                        Game Api for ClipJump                        ****
*****************************************************************************
****                                                                     ****
****          @author Miguel Fernandez - muitxer - github.com/muit       ****
**************************************************************************###

window.CJ or= {};
CJ.log = (message)->
  console.log "ClipJump: "+message

CJ.start = ->
  game = new CJ.Game
  game.start()
  return game

CJ.editor = (designer)->
  game = new CJ.Game
  game.editor designer
  return game

class CJ.Game
  application = {}

  constructor: ->

  start: ->
    CJ.instance = this

    @canvas = document.getElementById "canvas"
    @application = new pc.fw.Application @canvas

    #Screen Setup
    @application.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
    @application.setCanvasResolution(pc.fw.ResolutionMode.AUTO);
    @application.start();
    @onload()
    @player.addScript "input_handler"

  editor: (@application)->
    if !@application then throw new Error("Need an application object!")
    CJ.instance = this
    @onload()


  onload: ->
    CJ.log "Staring ClipJump"
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
