class CJ.Script
  @_list = {}
  @scripts_loaded = []

  @create: (name, callback)->
    @_list[name] = callback()

  @add: (name, unit, attrs)->
    script = new @_list[name] unit
    script.initialize attrs

    unit.scripts or= {}
    unit.scripts[name] = script

    @scripts_loaded.push script
    return script

  @update: (dt)->
    for script in @scripts_loaded
      script.update dt
