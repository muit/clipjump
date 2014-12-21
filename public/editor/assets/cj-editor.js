CJ = CJ || {}
CJ.Editor = function(){
  this.loadComponents();
};

CJ.Editor.prototype.loadComponents = function()
{
  this.mainMenu        = {
    element: document.getElementById("mainmenu"),
  };

  this.packExplorer    = {
    element: document.getElementById("packexplorer"),
  };

  this.assetExplorer   = {
    element: document.getElementById("assetexplorer"),
    _empty_container: document.getElementById("component-1028"),
    _container: document.getElementById("dataview-1029"),
    _showing: [],
    _showing_type: "all",

    cubes: [],
    materials: [],
    maps: [],

    init: function(){
      this._empty_container.innerHTML = CJ.Editor.Text.ASSET_EXPLORER_EMPTY;
      this._show();
    },

    showAll: function(){
      this._showing_type = "all";
      this._show();
    },

    showCubes: function(){
      this._showing_type = "cubes";
      this._show();
    },

    showMaterials: function(){
      this._showing_type = "materials";
      this._show();
    },

    showMaps: function(){
      this._showing_type = "maps";
      this._show();
    },

    _show: function(){
      this._reset();
      var i, len, unit;

      if(this._showing_type == "cubes" || this._showing_type == "all")
        for(i = 0, len = this.cubes.length; i<len; i++){
          unit = {
            name: this.cubes[i].name,
            element: CJ.Editor.Text.get("ASSET_EXPLORER_CUBE", {id: i, name: this.cubes[i].name})
          };
          this._showing.push(unit);
          this._container.innerHTML += unit.element;
        }

      if(this._showing_type == "materials" || this._showing_type == "all")
        for(i = 0, len = this.materials.length; i<len; i++){
          unit = {
            name: this.cubes[i].name,
            element: CJ.Editor.Text.get("ASSET_EXPLORER_MATERIAL", {id: i, name: this.materials[i].name})
          };
          this._showing.push(unit);
          this._container.innerHTML += unit.element;
        }

      if(this._showing_type == "maps" || this._showing_type == "all")
        for(i = 0, len = this.maps.length; i<len; i++){
          unit = {
            name: this.cubes[i].name,
            element: CJ.Editor.Text.get("ASSET_EXPLORER_MAP", {id: i, name: this.maps[i].name})
          };
          this._showing.push(unit);
          this._container.innerHTML += unit.element;
        }

      if(this._showing.length < 1)
        this._showEmpty();
    },

    _showEmpty: function(){
      this._empty_container.style.display = "block";
    },
    _reset: function(){
      this._showing = [];
      this._empty_container.style.display = "none";
      this._container.innerHTML = "";
    },

    addCube: function(asset){
      this.cubes.push(asset);
      this._show();
    },
    addMaterial: function(asset){
      this.cubes.push(asset);
      this._show();
    },
    addMap: function(asset){
      this.maps.push(asset);
      this._show();
    }
  };
  this.assetExplorer.init();

  this.attributeEditor = {
    element: document.getElementById("east-region-container"),
  };

  this.scripts         = {
    element: document.getElementById("codeview-1267"),
  };

  this.statusBar       = {
    element: document.getElementById("south-region-statusbar"),
    loading: {
      image: document.getElementById("image-1275"),
      text: document.getElementById("tbtext-1273"),
    },
    createLoading: function(){

    },
    setLoading: function(value, text){
      if(!this.loading.image || !this.loading.text)
        this.createLoading();
      this.loading.image.style.display = (value)?"block":"none";
      this.loading.text.style.display = (value)?"block":"none";
      this.loading.text.innerHTML = (value)?text:"";
    },
  };
};

CJ.Editor.Text = {
  get: function(name, attrs){
    var text = this[name];
    if(attrs && typeof attrs == "object")
      for(rep in attrs){
        text = text.replace("%"+rep+"%", attrs[rep]);
      }
    return text;
  },

  ASSET_EXPLORER_EMPTY:    'No assets available. Drag and drop some assets here.',
  ASSET_EXPLORER_CUBE:     '<div class="pcd-dataview-item"><img src="./assets/images/icons/64x64/asset.png"><span class="pcd-dataview-item-label" id="%id%">%name%</span></div>',
  ASSET_EXPLORER_MATERIAL: '<div class="pcd-dataview-item"><img src="./assets/images/icons/64x64/material.png"><span class="pcd-dataview-item-label" id="%id%">%name%</span></div>',
  ASSET_EXPLORER_MAP:      '<div class="pcd-dataview-item"><img src="./assets/images/icons/64x64/asset.png"><span class="pcd-dataview-item-label" id="%id%">%name%</span></div>',
};


