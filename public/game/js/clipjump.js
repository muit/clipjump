(function(){var __hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};console.log("------------------------------------\n--      ClipJump   v.'1.0.0'      --\n------------------------------------\n-- Copyright © 2014~2015 Clipjump --\n--   Copyright © 2014~2015 Muit   --\n--     (miguel_3c@hotmail.com)    --\n------------------------------------\n"),window.CJ||(window.CJ={}),CJ.Game=function(){function Game(){CJ.instance=this,this.canvas=document.getElementById("canvas"),this.application=new pc.fw.Application(this.canvas),this.onload()}var application;return application={},Game.prototype.onload=function(){return this.application.start(),this.application.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW),this.application.setCanvasResolution(pc.fw.ResolutionMode.AUTO),this.camera=new pc.fw.Entity,this.application.context.systems.camera.addComponent(this.camera,{clearColor:new pc.Color(.4,.45,.5)})},Game.prototype.onunload=function(){},Game.prototype.error=function(message){throw new Error(message)},Game}(),CJ.Map=function(){function Map(){}return Map}(),CJ.Unit=function(){function Unit(){this.entity=new pc.fw.Entity}var entity;return entity={},Unit}(),CJ.Cube=function(_super){function Cube(){Cube.__super__.constructor.apply(this,arguments)}return __extends(Cube,_super),Cube}(CJ.Unit),CJ.Cube=function(_super){function Cube(){Cube.__super__.constructor.apply(this,arguments)}return __extends(Cube,_super),Cube}(CJ.Unit),CJ.Cube=function(_super){function Cube(){Cube.__super__.constructor.apply(this,arguments),CJ.instance.application.context.systems.model.addComponent(this.entity,{type:"box"})}return __extends(Cube,_super),Cube}(CJ.Unit)}).call(this);