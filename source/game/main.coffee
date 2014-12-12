window.ClipJump =
class ClipJump

  constructor: ->
    @TurbulenzEngine = WebGLTurbulenzEngine.create {
      canvas: document.getElementById "canvas"
    }

    @TurbulenzEngine.onerror = (message)->
      @error message

    @TurbulenzEngine.onload = ->
      graphicsDeviceParameters = {}
      @graphicsDevice = @TurbulenzEngine.createGraphicsDevice graphicsDeviceParameters

      if !@graphicsDevice.shadingLanguageVersion
        @error "No shading language support detected.\nPlease check your graphics drivers are up to date."
        @graphicsDevice = null
        return;

      if @graphicsDevice.beginFrame()
        @graphicsDevice.clear [0.95, 0.95, 1.0, 1.0]
        @graphicsDevice.endFrame()

  @error: (message) ->
    throw new Error message
