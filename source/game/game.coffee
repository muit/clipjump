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

    @cube = new CJ.Cube

    #Camera
    @camera = new pc.fw.Entity
    @application.context.systems.camera.addComponent @camera, {
      clearColor: new pc.Color 0.4, 0.45, 0.5
    }
    @application.context.root.addChild(@camera);
    @camera.translate 0, 0, 10
    @camera.lookAt 0, 0, 0


    angle = 0;
    @application.on "update", (dt) =>
      angle += dt
      if (angle > 360)
        angle = 0;

      # Move the light in a circle
      if window.light!=undefined then light.entity.setLocalPosition(3 * Math.sin(angle), 0, 3 * Math.cos(angle));

      # Rotate the cube
      @cube.entity.setEulerAngles(angle*2, angle*4, angle*8);

  onunload: ->


  error: (message) ->
    throw new Error message
