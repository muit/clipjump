(function() {
  var level,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  console.log("------------------------------------\n" + "--      ClipJump   v.'1.0.0'      --\n" + "------------------------------------\n" + "-- Copyright © 2014~2015 Clipjump --\n" + "--   Copyright © 2014~2015 Muit   --\n" + "--     (miguel_3c@hotmail.com)    --\n" + "------------------------------------\n");


  /***************************************************************************
  ****                        Game Api for ClipJump                        ****
  *****************************************************************************
  ****                                                                     ****
  ****          @author Miguel Fernandez - muitxer - github.com/muit       ****
  **************************************************************************
   */

  window.CJ || (window.CJ = {});

  CJ.log = function(message) {
    return console.log("ClipJump: " + message);
  };

  CJ.Game = (function() {
    var application;

    application = {};

    function Game() {
      CJ.instance = this;
      this.canvas = document.getElementById("canvas");
      this.application = new pc.fw.Application(this.canvas);
      this.onload();
    }

    Game.prototype.onload = function() {
      var light;
      this.application.start();
      this.application.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
      this.application.setCanvasResolution(pc.fw.ResolutionMode.AUTO);
      this.map = new CJ.Map;
      this.map.load(CJ.Level.get(0));
      light = new CJ.Light({
        type: "point",
        castShadows: true
      });
      light.translate(2, 2, 2);
      this.player = new CJ.Player;
      this.player.translate(1, 1, 1);
      this.player.addScript("input_handler");
      this.camera = new pc.fw.Entity;
      this.application.context.systems.camera.addComponent(this.camera, {
        clearColor: new pc.Color(0.6, 0.6, 0.6)
      });
      this.application.context.root.addChild(this.camera);
      this.camera.translate(2, 2, 10);
      this.camera.lookAt(2, 0, 0);
      return this.application.on("update", this.update);
    };

    Game.prototype.onunload = function() {};

    Game.prototype.update = function(dt) {
      return CJ.Script.update(dt);
    };

    Game.prototype.error = function(message) {
      throw new Error(message);
    };

    return Game;

  })();

  CJ.Level = (function() {
    Level.list = [];

    Level.add = function(level) {
      return this.list[level.id] = level;
    };

    Level.get = function(id) {
      return this.list[id];
    };

    function Level(id) {
      this.id = id;
    }

    Level.prototype.setBlocks = function(blocks) {
      this.blocks = blocks;
    };

    return Level;

  })();

  CJ.Map = (function() {
    function Map() {
      this.entity = new pc.fw.Entity;
      CJ.instance.application.context.root.addChild(this.entity);
    }

    Map.prototype.load = function(level) {
      var cube, cubeId, line, plane, x, y, z, _ref, _results;
      this.level = level;
      _ref = this.level.blocks;
      _results = [];
      for (z in _ref) {
        plane = _ref[z];
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (x in plane) {
            line = plane[x];
            _results1.push((function() {
              var _results2;
              _results2 = [];
              for (y in line) {
                cubeId = line[y];
                if (cubeId !== 0) {
                  cube = new CJ.Cube(cubeId, this.entity);
                  _results2.push(cube.translate(x, y, z));
                } else {
                  _results2.push(void 0);
                }
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Map.prototype.reset = function() {
      var entity, _i, _len, _ref, _results;
      _ref = map.entity._children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        _results.push(entity.destroy());
      }
      return _results;
    };

    return Map;

  })();

  CJ.Script = (function() {
    function Script() {}

    Script._list = {};

    Script.scripts_loaded = [];

    Script.create = function(name, callback) {
      return this._list[name] = callback();
    };

    Script.add = function(name, unit) {
      var script;
      script = new this._list[name](unit);
      script.initialize();
      this.scripts_loaded.push(script);
      return script;
    };

    Script.initialize = function() {
      var script, _i, _len, _ref, _results;
      _ref = this.scripts_loaded;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        script = _ref[_i];
        _results.push(script.initialize());
      }
      return _results;
    };

    Script.update = function(dt) {
      var script, _i, _len, _ref, _results;
      _ref = this.scripts_loaded;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        script = _ref[_i];
        _results.push(script.update(dt));
      }
      return _results;
    };

    return Script;

  })();

  CJ.Unit = (function() {
    var entity;

    entity = {};

    Unit.app = void 0;

    function Unit() {
      this.entity = new pc.fw.Entity;
    }

    Unit.prototype.addContext = function(context) {
      if (!context) {
        return CJ.instance.application.context.root.addChild(this.entity);
      } else {
        return context.addChild(this.entity);
      }
    };

    Unit.prototype.translate = function(x, y, z) {
      return this.entity.translate(x, y, z);
    };

    Unit.prototype.addScript = function(name) {
      return CJ.Script.add(name, this);
    };

    return Unit;

  })();

  CJ.Cube = (function(_super) {
    __extends(Cube, _super);

    function Cube() {
      Cube.__super__.constructor.apply(this, arguments);
    }

    return Cube;

  })(CJ.Unit);

  CJ.Cube = (function(_super) {
    __extends(Cube, _super);

    function Cube() {
      Cube.__super__.constructor.apply(this, arguments);
    }

    return Cube;

  })(CJ.Unit);

  CJ.Cube = (function(_super) {
    __extends(Cube, _super);

    function Cube(id, context) {
      var type;
      this.id = id != null ? id : 1;
      Cube.__super__.constructor.apply(this, arguments);
      type = CJ.Cube.Types.getById(id);
      CJ.instance.application.context.systems.model.addComponent(this.entity, {
        type: "box",
        castShadows: true,
        receiveShadows: true
      });
      this.addContext(context);
    }

    Cube.prototype.setColor = function(color) {};

    Cube.prototype.destroy = function() {
      return this.entity.destroy();
    };

    return Cube;

  })(CJ.Unit);

  CJ.Cube.Types = (function() {
    function Types() {}

    Types.all = [];

    Types.add = function(id, name, stats) {
      return this.all[id] = {
        id: id,
        name: name,
        stats: stats
      };
    };

    Types.getById = function(id) {
      return this.all[id];
    };

    Types.getByName = function(name) {
      var results, type, _i, _len, _ref;
      results = [];
      _ref = this.all;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        if (name === type.name) {
          results.push(type);
        }
      }
      if (results.length > 0) {
        return results;
      }
    };

    Types.add(0, "Nothing", void 0);

    Types.add(1, "Blue Box", void 0);

    Types.add(2, "Green Box", void 0);

    Types.add(3, "Red Box", void 0);

    Types.add(4, "Player Box", void 0);

    return Types;

  })();

  CJ.Light = (function(_super) {
    __extends(Light, _super);

    function Light(opts) {
      Light.__super__.constructor.apply(this, arguments);
      if (!opts) {
        throw new Error("Light options must be provided.");
      }
      opts.color = opts.color || new pc.Color(1, 0, 0);
      opts.type = opts.type || "point";
      opts.radius = opts.radius || 10;
      CJ.instance.application.context.systems.light.addComponent(this.entity, opts);
      this.addContext();
    }

    Light.prototype.setColor = function(color) {};

    return Light;

  })(CJ.Unit);

  CJ.Player = (function(_super) {
    __extends(Player, _super);

    function Player(context) {
      Player.__super__.constructor.call(this, 4, context);
      this.controller = new pc.input.Controller(document);
      this.controller.registerKeys('forward', [pc.input.KEY_UP, pc.input.KEY_W]);
      this.controller.registerKeys('back', [pc.input.KEY_DOWN, pc.input.KEY_S]);
      this.controller.registerKeys('left', [pc.input.KEY_LEFT, pc.input.KEY_A]);
      this.controller.registerKeys('right', [pc.input.KEY_RIGHT, pc.input.KEY_D]);
      this.controller.registerKeys('jump', [pc.input.KEY_SPACE]);
    }

    Player.prototype.update = function(dt) {
      var x, z;
      x = 0;
      if (this.controller.wasPressed('forward')) {
        z = 1;
      } else if (this.controller.wasPressed('back')) {
        z = -1;
      }
      z = 0;
      if (this.controller.wasPressed('left')) {
        x = 1;
      } else if (this.controller.wasPressed('right')) {
        x = -1;
      }
      return this.entity.translate(x, 0, z);
    };

    return Player;

  })(CJ.Cube);

  level = new CJ.Level(0);

  level.setBlocks({
    0: {
      0: {
        0: 1
      },
      1: {
        0: 1
      },
      2: {
        0: 1
      },
      3: {
        0: 1
      },
      4: {
        0: 1
      },
      5: {
        0: 1
      },
      6: {
        0: 1
      },
      7: {
        0: 1
      }
    },
    1: {
      0: {
        0: 1
      },
      1: {
        0: 1
      },
      2: {
        0: 1
      },
      3: {
        0: 1
      },
      4: {
        0: 1
      },
      5: {
        0: 1
      },
      6: {
        0: 1
      },
      7: {
        0: 1
      }
    },
    2: {
      0: {
        0: 1
      },
      1: {
        0: 1
      },
      2: {
        0: 1
      },
      3: {
        0: 1
      },
      4: {
        0: 1
      },
      5: {
        0: 1
      },
      6: {
        0: 1
      },
      7: {
        0: 1
      }
    },
    3: {
      0: {
        0: 1
      },
      1: {
        0: 1
      },
      2: {
        0: 1
      },
      3: {
        0: 1
      },
      4: {
        0: 1
      },
      5: {
        0: 1
      },
      6: {
        0: 1
      },
      7: {
        0: 1
      }
    },
    4: {
      0: {
        0: 1
      },
      1: {
        0: 1
      },
      2: {
        0: 1
      },
      3: {
        0: 1,
        1: 2
      },
      4: {
        0: 1
      },
      5: {
        0: 1
      },
      6: {
        0: 1
      },
      7: {
        0: 1
      }
    },
    5: {
      0: {
        0: 1
      },
      1: {
        0: 1
      },
      2: {
        0: 1
      },
      3: {
        0: 1
      },
      4: {
        0: 1
      },
      5: {
        0: 1
      },
      6: {
        0: 1
      },
      7: {
        0: 1
      }
    },
    6: {
      0: {
        0: 1
      },
      1: {
        0: 1
      },
      2: {
        0: 1
      },
      3: {
        0: 1
      },
      4: {
        0: 1
      },
      5: {
        0: 1
      },
      6: {
        0: 1
      },
      7: {
        0: 1
      }
    },
    7: {
      0: {
        0: 1
      },
      1: {
        0: 1
      },
      2: {
        0: 1
      },
      3: {
        0: 1
      },
      4: {
        0: 1
      },
      5: {
        0: 1
      },
      6: {
        0: 1
      },
      7: {
        0: 1
      }
    }
  });

  CJ.Level.add(level);

  CJ.Script.create("input_handler", (function(_this) {
    return function() {
      var InputHandler;
      InputHandler = (function() {
        function InputHandler(unit) {
          this.unit = unit;
          this.speed = 3;
        }

        InputHandler.prototype.initialize = function() {
          this.controller = new pc.input.Controller(document);
          this.controller.registerKeys('forward', [pc.input.KEY_UP, pc.input.KEY_W]);
          this.controller.registerKeys('back', [pc.input.KEY_DOWN, pc.input.KEY_S]);
          this.controller.registerKeys('left', [pc.input.KEY_LEFT, pc.input.KEY_A]);
          this.controller.registerKeys('right', [pc.input.KEY_RIGHT, pc.input.KEY_D]);
          return this.controller.registerKeys('jump', [pc.input.KEY_SPACE]);
        };

        InputHandler.prototype.update = function(dt) {
          var x, z;
          z = 0;
          if (this.controller.isPressed('forward')) {
            z = -1;
          } else if (this.controller.isPressed('back')) {
            z = 1;
          }
          x = 0;
          if (this.controller.isPressed('left')) {
            x = -1;
          } else if (this.controller.isPressed('right')) {
            x = 1;
          }
          return this.unit.entity.translate(x * this.speed * dt, 0, z * this.speed * dt);
        };

        return InputHandler;

      })();
      return InputHandler;
    };
  })(this));

}).call(this);
