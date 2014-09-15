/*****************************************************************************
 ****                      Clip Engine for ThreeJs                        ****
 *****************************************************************************
 ****                                                                     ****
 ****          @author Miguel Fernandez - muitxer - github.com/muit       ****
 ****************************************************************************/

if(typeof Utyl == "undefined") require("../source/utyl/utyl.js");

/** Clip Module (Engine)
 * Main module. Contains all the engine system.
 * @type {Object}
 */
Clip = {
    version: "0.0.01",
    require: function(moduleName){
        if (typeof moduleName == "string") {
            moduleName = String(moduleName).toLowerCase();
            if (moduleName in this.modules) {
                return this.modules[moduleName];
            }
            throw new Error("Clip.require: module name '" + moduleName + "' does not exist");
        }
        throw new Error("Clip.require: Expected argument typeof 'string', got '" + (typeof moduleName) + "'");
    },
    log: function(text){
        console.log(text);
    },
    modules: {},
};
Clip.log("*************************************************");
CLip.log("****      Clip Engine v"+Clip.version+"      ****");
CLip.log("*************************************************");

/** Graphic Model (API)
 * Control all the graphics
 * @type {Object}
 */
Graphic = {};
Graphic.start = function(){
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

    return this;
};

/**
 * Reload canvas window.
 * @param  {Object} element Dom element that will contain the game screen.
 * @param  {Object} options Options to define how to process the reload.
 */
Graphic.reload = function(element, options){
    if(!element) throw new Error("Canvas element provided does not exist.");

    this.Screen.element = element;
    canvas.innerHTML = "";

    var side = 0;
    if(canvas.clientHeight < canvas.clientWidth)
        side = canvas.clientHeight;
    else
        side = canvas.clientWidth;

    this.height = side;
    this.width = side;

    this.renderer.setClearColor(0x777777);
    this.renderer.setSize(side, side);

    canvas.appendChild(this.renderer.domElement);
    this.loadStats(options);
};
/**
 * Load canvas window.
 * @param  {Object} element Dom element that will contain the game screen.
 * @param  {Object} options Options to define how to process the load.
 */
Graphic.load = Graphic.reload;

Graphic.Screen = {
  height: 0,
  width: 0,
  element: undefined,
};



/** Animation Class
 * Control animation instances
 */
Animation = function(){};

Animation.prototype.update = function(diff){};
Animation.prototype.render = function(diff){};
Graphic.Animation = Animation;

/**
 * Contains the z position of a component.
 * @param {String} name Name of the layout.
 */
Layout = function(name, z){
    this.name = name;
    this.z = z;

    if(!this.constructor.all.contains(this))
        this.constructor.createLayout(this);
    else
        Clip.log("Couldn't create new Layout.");
};
Layout.createLayout = function(layoutCreated){
    (this.all = this.all || []).push(layoutCreated);
};

/** Component Class
 * Father of everything
 * @param {Layout} layout Layout of the component to indicate the z-index.
 */
Graphic.Component = function(layout){};
Graphic.Component.prototype.update = function(diff){};
Graphic.Component.prototype.render = function(diff){};
Graphic.Component.prototype.position = new Vector3(0,0,0);
Graphic.Component.prototype.rotation = new Vector3(0,0,0);



Clip.modules.Graphic = Graphic.start();
