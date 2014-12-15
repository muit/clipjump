###**************************************************************************
****                        Game Api for ClipJump                        ****
*****************************************************************************
****                                                                     ****
****          @author Miguel Fernandez - muitxer - github.com/muit       ****
**************************************************************************###

window.CJ or= {};
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

    @map = new CJ.Map
    @map.load CJ.Level.get 0

    light = new CJ.Light {}
    light.translate 2,2,2

    #Camera
    @camera = new pc.fw.Entity
    @application.context.systems.camera.addComponent @camera, {
      clearColor: new pc.Color 0.4, 0.45, 0.5
    }
    @application.context.root.addChild(@camera);
    @camera.translate 2, 2, 10
    @camera.lookAt 2, 0, 0

    @application.on "update", @update


  onunload: ->

  update: (dt)->


  error: (message) ->
    throw new Error message
