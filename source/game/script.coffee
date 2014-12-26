class CJ.Script
  @_list = {}
  @scripts_loaded = []

  @create: (name, callback)->
    @_list[name] = callback()

  @add: (name, unit, attrs)->
    script = new @_list[name] unit
    script.initialize attrs

    id = @scripts_loaded.push script
    unit.scripts or= {}
    unit.scripts[name] = {id: id, script: script}

    return script

  @remove: (name, unit)->
    if !unit.scripts
      throw new Error "Current unit doesn't have any script."
    scriptData = unit.scripts[name]
    if !scriptData
      throw new Error "Current unit doesn't have the "+name+" script."

    delete unit.scripts[name]
    delete @scripts_loaded[scriptData.id]

  @update: (dt)->
    for script in @scripts_loaded
      if script
        script.update dt
