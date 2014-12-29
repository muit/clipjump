window.CJ or= {}
class CJ.Assets
  @load: (callback)->
    requests = [
      CJ.instance.application.context.assets.loadFromUrl("./assets/music/afrola.mp3", pc.asset.ASSET_AUDIO),
      CJ.instance.application.context.assets.loadFromUrl("./assets/textures/cube.jpg", pc.asset.ASSET_TEXTURE)
    ]

    @assets = CJ.instance.application.context.assets

    pc.promise.all(requests).then (results)=>
      callback results

  @find: (name)->
    return CJ.instance.application.context.assets.find name
