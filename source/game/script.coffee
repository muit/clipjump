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

  @remove: (name, unit)->
    if !unit.scripts
      throw new Error "Current unit doesn't have any script."
    script = unit.scripts[name]
    if !script
      throw new Error "Current unit doesn't have the "+name+" script."

    unit.scripts[name] = undefined
    @scripts_loaded.remove script

  @update: (dt)->
    for script in @scripts_loaded
      script.update dt
