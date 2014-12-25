###**************************************************************************
****                        Game Api for ClipJump                        ****
*****************************************************************************
****                                                                     ****
****          @author Miguel Fernandez - muitxer - github.com/muit       ****
**************************************************************************###

window.CJ or= {}
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
    @play = true
    CJ.instance = this

    @canvas = document.getElementById "canvas"
    @application = new pc.fw.Application @canvas

    #Screen Setup
    @application.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
    @application.setCanvasResolution(pc.fw.ResolutionMode.AUTO);
    @application.start();

    CJ.Assets.load (results)=>
      @onload()

  editor: (@application)->
    @play = false
    if !@application then throw new Error("Need an application object!")
    CJ.instance = this
    CJ.Assets.load (results)=>
      @onload()

  onload: ->
    CJ.log "Staring ClipJump"
    @application.context.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

    #Load Map
    @map = new CJ.Map
    @map.load CJ.Level.get 0

    @light = new CJ.Light {
      type: "directional",
      castShadows: true,
      color: new pc.Color(1, 1, 1),
      castShadows: true,
      shadowResolution: 2048
    }
    @light.rotateLocal 45,30,0
    @light.translate 2,2,2

    #Add Player
    @player = new CJ.Player
    @player.translate 1,1,1
    if @play
      @player.addScript "input_handler"

    #Add Camera
    @camera = new CJ.Camera @player.entity
    @camera.addScript "camera_movement", {player: @player}

    @application.on "update", @update


  onunload: ->

  update: (dt)->
    CJ.Script.update dt

  error: (message) ->
    throw new Error message
