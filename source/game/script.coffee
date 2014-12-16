class CJ.Script
  @_list = {}
  @scripts_loaded = []

  @create: (name, callback)->
    @_list[name] = callback()

  @add: (name, unit)->
    script = new @_list[name] unit
    script.initialize()
    @scripts_loaded.push script
    return script

  @initialize: ->
    for script in @scripts_loaded
      script.initialize()

  @update: (dt)->
    for script in @scripts_loaded
      script.update dt
