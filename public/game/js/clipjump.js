(function(){var level,__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};console.log("------------------------------------\n--      ClipJump   v.'1.0.0'      --\n------------------------------------\n-- Copyright © 2014~2015 Clipjump --\n--   Copyright © 2014~2015 Muit   --\n--     (miguel_3c@hotmail.com)    --\n------------------------------------\n"),window.CJ||(window.CJ={}),CJ.log=function(message){return console.log("ClipJump: "+message)},CJ.start=function(){var game;return game=new CJ.Game,game.start(),game},CJ.editor=function(designer){var game;return game=new CJ.Game,game.editor(designer),game},CJ.Game=function(){function Game(){}var application;return application={},Game.prototype.start=function(){return CJ.instance=this,this.canvas=document.getElementById("canvas"),this.application=new pc.fw.Application(this.canvas),this.application.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW),this.application.setCanvasResolution(pc.fw.ResolutionMode.AUTO),this.application.start(),this.onload(),this.player.addScript("input_handler")},Game.prototype.editor=function(application){if(this.application=application,!this.application)throw new Error("Need an application object!");return CJ.instance=this,this.onload()},Game.prototype.onload=function(){return CJ.log("Staring ClipJump"),this.application.context.scene.ambientLight=new pc.Color(.2,.2,.2),this.map=new CJ.Map,this.map.load(CJ.Level.get(0)),this.light=new CJ.Light({type:"directional",castShadows:!0,color:new pc.Color(1,1,1),castShadows:!0,shadowResolution:2048}),this.light.rotateLocal(45,30,0),this.light.translate(2,2,2),this.player=new CJ.Player,this.player.translate(1,1,1),this.camera=new CJ.Camera(this.player.entity),this.camera.addScript("camera_movement",{player:this.player}),this.application.on("update",this.update)},Game.prototype.onunload=function(){},Game.prototype.update=function(dt){return CJ.Script.update(dt)},Game.prototype.error=function(message){throw new Error(message)},Game}(),CJ.Level=function(){function Level(id){this.id=id}return Level.list=[],Level.add=function(level){return this.list[level.id]=level},Level.get=function(id){return this.list[id]},Level.prototype.setBlocks=function(blocks){this.blocks=blocks},Level}(),CJ.Map=function(){function Map(){this.entity=new pc.fw.Entity,CJ.instance.application.context.root.addChild(this.entity)}return Map.prototype.load=function(level){var cube,cubeId,line,plane,x,y,z,_ref,_results;this.level=level,_ref=this.level.blocks,_results=[];for(z in _ref)plane=_ref[z],_results.push(function(){var _results1;_results1=[];for(x in plane)line=plane[x],_results1.push(function(){var _results2;_results2=[];for(y in line)cubeId=line[y],0!==cubeId?(cube=new CJ.Cube(cubeId,this.entity),_results2.push(cube.translate(x,y,z))):_results2.push(void 0);return _results2}.call(this));return _results1}.call(this));return _results},Map.prototype.reset=function(){var entity,_i,_len,_ref,_results;for(_ref=map.entity._children,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)entity=_ref[_i],_results.push(entity.destroy());return _results},Map}(),CJ.Script=function(){function Script(){}return Script._list={},Script.scripts_loaded=[],Script.create=function(name,callback){return this._list[name]=callback()},Script.add=function(name,unit,attrs){var script;return script=new this._list[name](unit),script.initialize(attrs),this.scripts_loaded.push(script),script},Script.update=function(dt){var script,_i,_len,_ref,_results;for(_ref=this.scripts_loaded,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)script=_ref[_i],_results.push(script.update(dt));return _results},Script}(),CJ.Unit=function(){function Unit(){this.entity||(this.entity=new pc.fw.Entity),this.events||(this.events={})}return Unit.app=void 0,Unit.prototype.addContext=function(context){return context?context.addChild(this.entity):CJ.instance.application.context.root.addChild(this.entity)},Unit.prototype.translate=function(x,y,z){return this.entity.translate(x,y,z)},Unit.prototype.rotateLocal=function(x,y,z){return this.entity.rotateLocal(x,y,z)},Unit.prototype.translateLocal=function(x,y,z){return this.entity.translateLocal(x,y,z)},Unit.prototype.setLocalPosition=function(x,y,z){return this.entity.setLocalPosition(x,y,z)},Unit.prototype.setPosition=function(x,y,z){return this.entity.setPosition(x,y,z)},Unit.prototype.getPosition=function(){return this.entity.getPosition()},Unit.prototype.getLocalRotation=function(){return this.entity.getLocalRotation()},Unit.prototype.getLocalPosition=function(){return this.entity.getLocalPosition()},Unit.prototype.lookAt=function(x,y,z){var pos;return x instanceof CJ.Unit?(pos=x.getPosition(),void this.entity.lookAt(pos.x,pos.y,pos.z)):this.entity.lookAt(x,y,z)},Unit.prototype.addScript=function(name,attrs){return CJ.Script.add(name,this,attrs)},Unit.prototype.on=function(name,callback){return"function"!=typeof callback?void CJ.log("This event("+name+") is not a function."):this.events[name]=callback},Unit.prototype.call=function(name,attrs){return this.events[name]?"function"!=typeof this.events[name]?void CJ.log("This event("+name+") is not a function."):this.events[name](attrs):void CJ.log("This event("+name+") doesnt exist.")},Unit}(),CJ.Cube=function(_super){function Cube(){Cube.__super__.constructor.apply(this,arguments)}return __extends(Cube,_super),Cube}(CJ.Unit),CJ.Cube=function(_super){function Cube(){Cube.__super__.constructor.apply(this,arguments)}return __extends(Cube,_super),Cube}(CJ.Unit),CJ.Cube=function(_super){function Cube(id,context){var type;this.id=null!=id?id:1,Cube.__super__.constructor.apply(this,arguments),type=CJ.Cube.Types.getById(id),CJ.instance.application.context.systems.model.addComponent(this.entity,{type:"box",castShadows:!0,receiveShadows:!0}),this.addContext(context)}return __extends(Cube,_super),Cube.prototype.setColor=function(){},Cube.prototype.destroy=function(){return this.entity.destroy()},Cube}(CJ.Unit),CJ.Cube.Types=function(){function Types(){}return Types.all=[],Types.add=function(id,name,stats){return this.all[id]={id:id,name:name,stats:stats}},Types.getById=function(id){return this.all[id]},Types.getByName=function(name){var results,type,_i,_len,_ref;for(results=[],_ref=this.all,_i=0,_len=_ref.length;_len>_i;_i++)type=_ref[_i],name===type.name&&results.push(type);return results.length>0?results:void 0},Types.add(0,"Nothing",void 0),Types.add(1,"Blue Box",void 0),Types.add(2,"Green Box",void 0),Types.add(3,"Red Box",void 0),Types.add(4,"Player Box",void 0),Types}(),CJ.Light=function(_super){function Light(opts){if(Light.__super__.constructor.apply(this,arguments),!opts)throw new Error("Light options must be provided.");opts.color=opts.color||new pc.Color(1,0,0),opts.type=opts.type||"point",opts.radius=opts.radius||10,CJ.instance.application.context.systems.light.addComponent(this.entity,opts),this.addContext()}return __extends(Light,_super),Light.prototype.setColor=function(){},Light}(CJ.Unit),CJ.Camera=function(_super){function Camera(context,color){Camera.__super__.constructor.apply(this,arguments),CJ.instance.application.context.systems.camera.addComponent(this.entity,{clearColor:color?color:new pc.Color(.6,.6,.6)}),this.addContext(context)}return __extends(Camera,_super),Camera}(CJ.Unit),CJ.Cube.Blue=function(_super){function Blue(context){Blue.__super__.constructor.call(this,1,context)}return __extends(Blue,_super),Blue}(CJ.Cube),CJ.Cube.Green=function(_super){function Green(context){Green.__super__.constructor.call(this,2,context)}return __extends(Green,_super),Green}(CJ.Cube),CJ.Player=function(_super){function Player(context){Player.__super__.constructor.call(this,4,context)}return __extends(Player,_super),Player}(CJ.Cube),CJ.Cube.Green=function(_super){function Green(context){Green.__super__.constructor.call(this,3,context)}return __extends(Green,_super),Green}(CJ.Cube),CJ.Model||(CJ.Model={}),CJ.Model.Bullet=function(_super){function Bullet(context){Bullet.__super__.constructor.apply(this,arguments),CJ.instance.application.context.systems.model.addComponent(this.entity,{type:"box",castShadows:!0,receiveShadows:!0}),this.entity.setLocalScale(.3,.1,.1),this.addContext(context)}return __extends(Bullet,_super),Bullet}(CJ.Unit),level=new CJ.Level(0),level.setBlocks({0:{0:{0:1},1:{0:1},2:{0:1},3:{0:1},4:{0:1},5:{0:1},6:{0:1},7:{0:1}},1:{0:{0:1},1:{0:1},2:{0:1},3:{0:1},4:{0:1},5:{0:1},6:{0:1},7:{0:1}},2:{0:{0:1},1:{0:1},2:{0:1},3:{0:1},4:{0:1},5:{0:1},6:{0:1},7:{0:1}},3:{0:{0:1},1:{0:1},2:{0:1},3:{0:1},4:{0:1},5:{0:1},6:{0:1},7:{0:1}},4:{0:{0:1},1:{0:1},2:{0:1},3:{0:1,1:2},4:{0:1},5:{0:1},6:{0:1},7:{0:1}},5:{0:{0:1},1:{0:1},2:{0:1},3:{0:1},4:{0:1},5:{0:1},6:{0:1},7:{0:1}},6:{0:{0:1},1:{0:1},2:{0:1},3:{0:1},4:{0:1},5:{0:1},6:{0:1},7:{0:1}},7:{0:{0:1},1:{0:1},2:{0:1},3:{0:1},4:{0:1},5:{0:1},6:{0:1},7:{0:1}}}),CJ.Level.add(level),CJ.Script.create("camera_movement",function(){return function(){var CameraMovement;return CameraMovement=function(){function CameraMovement(camera){this.camera=camera,this.rads=0,this.y_rads=0,this.dir=!1}return CameraMovement.prototype.initialize=function(attrs){return this.height=attrs.height||2,this.distance=attrs.distance||6,this.speed=attrs.speed||3,this.player=attrs.player,this.keyboard=new pc.input.Keyboard(document),this.keyboard.on("keydown",this.onKeyDown,this),this.camera.setLocalPosition(0,this.height,this.distance),this.camera.lookAt(this.player)},CameraMovement.prototype.onKeyDown=function(e){if(e.key===pc.input.KEY_P)this.rads-=Math.PI/2,this.dir=!1;else{if(e.key!==pc.input.KEY_O)return;this.rads+=Math.PI/2,this.dir=!0}return this.obj_x=this.distance*Math.round(Math.sin(this.rads)),this.obj_z=this.distance*Math.round(Math.cos(this.rads)),this.player.call("flip_controls",this.dir)},CameraMovement.prototype.update=function(dt){var position,x,z;return position=this.camera.getLocalPosition(),x=position.x,z=position.z,this.obj_x-.5>=x||this.obj_x+.5<=x||this.obj_z-.5>=z||this.obj_z+.5<=z?(this.y_rads=this.dir?this.y_rads+this.speed*dt:this.y_rads-this.speed*dt,x=this.distance*Math.sin(this.y_rads),z=this.distance*Math.cos(this.y_rads),this.camera.setLocalPosition(x,this.height,z),this.camera.lookAt(this.player)):void 0},CameraMovement}()}}(this)),CJ.Script.create("input_handler",function(){return function(){var InputHandler;return InputHandler=function(){function InputHandler(unit){this.unit=unit,this.speed=3,this.movements=["forward","left","back","right"]}return InputHandler.prototype.initialize=function(){var self;return this.controller=new pc.input.Controller(document),this.controller.registerKeys("forward",[pc.input.KEY_UP,pc.input.KEY_W]),this.controller.registerKeys("back",[pc.input.KEY_DOWN,pc.input.KEY_S]),this.controller.registerKeys("left",[pc.input.KEY_LEFT,pc.input.KEY_A]),this.controller.registerKeys("right",[pc.input.KEY_RIGHT,pc.input.KEY_D]),this.controller.registerKeys("jump",[pc.input.KEY_SPACE]),self=this,this.unit.on("flip_controls",function(){return function(direction){return direction===!0?self.movements.getLastFlip():direction===!1?self.movements.getNextFlip():void 0}}(this))},InputHandler.prototype.update=function(dt){var x,z;return z=0,this.controller.isPressed(this.movements[0])?z=-1:this.controller.isPressed(this.movements[2])&&(z=1),x=0,this.controller.isPressed(this.movements[1])?x=-1:this.controller.isPressed(this.movements[3])&&(x=1),this.unit.translate(x*this.speed*dt,0,z*this.speed*dt)},InputHandler}()}}(this))}).call(this);