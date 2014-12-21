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
  };

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


