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
    version: "0.0.02",
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
Clip.log("****      Clip Engine v"+Clip.version+"      ****");
Clip.log("*************************************************");


/**
 * Controller will take control of all the project components, including graphics, entities or objects.
 * @param {Object} config Contains the config of the engine
 */
Controller = function(config){
    this.graphic = new Clip.require("graphic")(config);
    this.logic = new Clip.require("logic")(config);
};
Controller.prototype.addEntity = function(entity){
    if(!entity instanceof Clip.Entity)
        throw new Error("Need an Entity!");
    this.entities = this.entities || [];
    this.entities.push(entity);
};

Controller.prototype.addObject = function(object){
    if(!entity instanceof Clip.Object)
        throw new Error("Need an Object!");
    this.objects = this.objects || [];
    this.entities.push(object);
};


/** Graphic Model (API)
 * Control all the graphics
 * @type {Object}
 */
Graphic = function(config){
    this.config = config;
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

    var self = this;
    window.onresize = this.resize;
};

Graphic.prototype.screen = {
  height: 0,
  width: 0,
  element: undefined,
};

/** resize Method
 * Resize the view if needed and enabled
 */
Graphic.prototype.resize = function(){
    if(this.config.resize)
        this.reload(this.screen.element, this.config);
};

/**
 * Reload canvas window.
 * @param  {Object} element Dom element that will contain the game screen.
 * @param  {Object} options Options to define how to process the reload.
 */
Graphic.prototype.reload = function(element, config){
    if(!element) throw new Error("Canvas element provided does not exist.");

    this.screen.element = element;
    element.innerHTML = "";

    this.screen.height = element.clientHeight;
    this.screen.width = element.clientWidth;

    this.renderer.setClearColor(0x777777);
    this.renderer.setSize(side, side);

    canvas.appendChild(this.renderer.domElement);
    this.loadStats();
};

/**
 * Load canvas window.
 * @param  {Object} element Dom element that will contain the game screen.
 * @param  {Object} options Options to define how to process the load.
 */
Graphic.prototype.load = Graphic.prototype.reload;


/** loadStats Method
 * Load webgl stats if enabled
 */
Graphic.prototype.loadStats = function(){
    if(!this.screen.element)
        throw new Error("Canvas element does not exist.");

    if(this.config.debug === true){
        //Render stats
        this.renderstats = new THREEx.RendererStats();
        this.renderstats.domElement.style.position = 'absolute';
        this.renderstats.domElement.style.left = '0px';
        this.renderstats.domElement.style.bottom = '0px';

        this.screen.element.appendChild( this.renderstats.domElement );

        //FPS stats
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.right    = '0px';
        this.stats.domElement.style.bottom   = '0px';

        this.screen.element.appendChild( this.stats.domElement );
    }
    else{
        //Fake stats adapters
        this.stats = {
            update: function(){}
        };
        this.renderstats = {
            update: function(r){}
        };
    }
};

/**
 * Contains the z position of a component.
 * @param {String} name Name of the layout.
 */
Layout = function(name, z){
    if(typeof z != "number")
        throw new Error("Z position must be a number");

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
 * Father of everything. For now only support for ThreeJs meshes.
 * @param {Layout} layout Layout of the component to indicate the z-index.
 */
Component = function(mesh, layout){
    this.layout = layout;
};
Component.defaultLayout = new Layout("default", 0);
Component.prototype.update = function(diff){};
Component.prototype.render = function(diff){};
Component.prototype.position = new Vector3(0,0,0);
Component.prototype.rotation = new Vector3(0,0,0);
Clip.Component = Component;

Clip.Entity = function(mesh, layout){};
Clip.Entity.defaultLayout = new Layout("defaultEntity", -7);
Clip.Entity.inherits(Component);

Clip.Object = function(mesh, layout){};
Clip.Object.defaultLayout = new Layout("defaultObject", -3);
Clip.Object.inherits(Component);
Clip.Object.prototype.spawn = function(){};

/** Animation Class
 * Control animation instances
 */
Animation = function(component){this.component = component;};
Animation.prototype.update = function(diff){};
Animation.prototype.render = function(diff){};
Component.Animation = Animation;


Clip.modules.component = Component;
Clip.modules.graphic = Graphic;
