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
    this.graphic = new Clip.require("graphic")(this, config);
    this.logic = new Clip.require("logic")(this, config);

    this.entities = [];
    this.objects = [];
};
Controller.prototype.addEntity = function(entity){
    if(!entity instanceof Clip.Entity)
        throw new Error("Need an Entity!");
    this.entities.push(entity);
};

Controller.prototype.addObject = function(object){
    if(!object instanceof Clip.Object)
        throw new Error("Need an Object!");
    this.entities.push(object);
};
Controller.prototype.update = function(diff){
    //Must change (4 loops every fps is crazy)
    for(var io = 0, leno = this.entities.length; io < leno; io++){
        this.entities[io].update(diff);
    }
    for(var ie = 0, lene = this.entities.length; ie < lene; ie++){
        this.entities[ie].update(diff);
    }
};
Controller.prototype.render = function(diff){
    //Must change (4 loops every fps is crazy)
    for(var io = 0, leno = this.entities.length; io < leno; io++){
        this.entities[io].render(diff);
    }
    for(var ie = 0, lene = this.entities.length; ie < lene; ie++){
        this.entities[ie].render(diff);
    }
};


/** Graphic Class (API)
 * Control all the graphics
 * @param {Controller} controller Graphic controller.
 * @param {Object}     config     Project config.
 */
Graphic = function(controller, config){
    if(!controller)
        throw new Error("Need a controller.");

    this.controller = controller;
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

    this.screen.element.appendChild(this.renderer.domElement);
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
Graphic.prototype.loop = function(){
    var self = this;
    self.timer = new Timer(function(diff){
        //self.scene.render();
    }, self.config.fps);
};





/** Logic Class (API)
 * @param {Controller} controller Logic controller.
 * @param {Object}     config     Project config.
 */
Logic = function(controller, config){
    if(!controller)
        throw new Error("Need a controller.");

    this.controller = controller;
    this.config = config;
};
Logic.prototype.loop = function(){
    var self = this;
    self.timer = new Timer(function(diff){
        self.controller.update(diff);
    }, self.config.fps);
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
    this.layout = layout || Component.defaultLayout;
    this.mesh = mesh || undefined;
};
Component.defaultLayout = new Layout("default", 0);
Component.prototype.update = function(diff){
    if(this.ia) this.ia.update(diff);
};
Component.prototype.position = new Vector3(0,0,0);
Component.prototype.rotation = new Vector3(0,0,0);
Component.prototype.distanceOf = function(target){
    return this.position.distance(target.position);
};
Component.prototype.addIA = function(ai){ this.ai = ai; this.ai.addComponent(this);};
Component.prototype.addCollider = function(){
    //this.collider = new Collider();
};
Component.prototype.addMesh = function(geometry, material){
    this.mesh = new THREE.Mesh(
        geometry,
        material || new THREE.MeshBasicMaterial({ color: 'blue' })
    );
};
Clip.Component = Component;


Clip.Component.Entity = function(mesh, layout){
    this.layout = layout || Component.Entity.defaultLayout;
    this.mesh = mesh || undefined;
};
Clip.Component.Entity.defaultLayout = new Layout("defaultEntity", -7);
Clip.Component.Entity.inherits(Component);

Clip.Component.Object = function(mesh, layout){
    this.layout = layout || Component.Object.defaultLayout;
    this.mesh = mesh || undefined;
};
Clip.Component.Object.defaultLayout = new Layout("defaultObject", -3);
Clip.Component.Object.inherits(Component);
Clip.Component.Object.prototype.spawn = function(){};



/** Animation Class
 * Control animation instances
 */
Animation = function(component){this.component = component;};
Animation.prototype.update = function(diff){};
Clip.Animation = Animation;





/** Network Class
 * Controls all the network comunication, including Internet, LAN and local.
 * @param {Adapter} adapter Asign an adapter depending on the type of the network.
 */
Network = function(adapter){
    if(adapter && !adapter instanceof Adapter)
        throw new Error("arg#0 must be an Adapter.");
    this.adapter = adapter || new WsAdapter();
};

Network.Adapter = function(){};
Network.FakeAdapter = function(){};
FakeAdapter.inherits(Adapter);
Network.LocalAdapter = function(){};
LocalAdapter.inherits(Adapter);
Network.WsAdapter = function(){};
WsAdapter.inherits(Adapter);


IA = function(component){
    this.component = component;
    this.events = new EventMap();
};
IA.prototype.update = function(diff){
};

SimpleEntityIA = function(component, attr){
    IA.call(this, component);
    if(typeof attrigutes != "object")
        throw new Error("Attributes must be a hash.");

    attr.health      = attr.health      || 0;
    attr.minHealth   = attr.minHealth   || 0;
    attr.maxHealth   = attr.maxHealth   || 1000;
    attr.inCombat    = attr.inCombat    || false;
    attr.meleRange   = attr.meleRange   || 4;
    attr.detectRange = attr.detectRange || 15;
    attr.lostRange   = attr.lostRange   || 25;
    this.attributes = attr;
    this.target = undefined;
};
SimpleEntityIA.inherits(IA);
SimpleEntityIA.prototype.setComponent = function(me){this.me = me;};
SimpleEntityIA.prototype.update = function(diff){
    if(this.inCombat)
    {
        if(this.me.distanceOf(this.target) > this.attributes.lostRange)
        {
            this.target = undefined;
            this.inCombat = false;
            this.onCombatEnd();
        }
        else
            this.combatUpdate(diff);
    }
    else if((this.target = look()) !== undefined)
    {
        this.attack();
    }
};
SimpleEntityIA.prototype.foward = function(player, diff){
    //Controll COmponent Foward depending on movement type
};
SimpleEntityIA.prototype.look = function(){
    return undefined;
};
SimpleEntityIA.prototype.attack = function(){
    this.inCombat = true;
    this.onCombatStart(this.target);
};
SimpleEntityIA.prototype.combatUpdate = function(diff){

};

//IA Events
SimpleEntityIA.prototype.onDie = function(target){};
SimpleEntityIA.prototype.onCombatStart = function(target){};
SimpleEntityIA.prototype.onTargetDied = function(target){};
SimpleEntityIA.prototype.onTargetLost = function(target){};
SimpleEntityIA.prototype.onCombatEnd = function(){};

SimpleEntityIA.prototype.damage = function(amount){
    var attr = this.attributes;
    if(attr.health-amount > attr.minHealth){
        attr.health -= amount;
        this.inCombat = true;
        return false;
    }
    else{
        attr.health = 0;
        this.inCombat = false;
        this.onDie(this.target);
        this.onCombatEnd();
        return true;
    }

};

Clip.modules.logic = Logic;
Clip.modules.graphic = Graphic;
Clip.modules.network = Network;
