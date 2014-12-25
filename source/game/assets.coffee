window.CJ or= {}
class CJ.Assets
  @assets = {}
  @load: (callback)->
    requests = [
      CJ.instance.application.context.assets.loadFromUrl("./assets/music/afrola.mp3", "audio")
    ]

    pc.promise.all(requests).then (results)=>
      for result in results
        @assets[result.asset.name] = result.asset
      callback results
