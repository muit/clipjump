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

    @light = new CJ.Light {
      type: "point",
      castShadows: true
    }
    @light.translate 2,2,2

    #Add Player
    @player = new CJ.Player
    @player.translate 1,1,1

    #Add Camera
    @camera = new CJ.Camera @player.entity
    @camera.addScript "camera_movement", {player: @player}


    @application.on "update", @update


  onunload: ->

  update: (dt)->
    CJ.Script.update dt

  error: (message) ->
    throw new Error message
