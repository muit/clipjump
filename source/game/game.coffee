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


    #Camera
    @camera = new pc.fw.Entity();
    @application.context.systems.camera.addComponent @camera, {
            clearColor: new pc.Color 0.4, 0.45, 0.5
    }



  onunload: ->


  error: (message) ->
    throw new Error message
