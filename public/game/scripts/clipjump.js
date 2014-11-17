ClipJump = function()
{
    this.map = new ClipJump.Map();
    this.objects = [];
    this.entities = [];
};

ClipJump.prototype =
{
    start: function()
    {
        this.camera = new ClipJump.Camera();
    },

    pause: function()
    {

    },

    stop: function()
    {
        TurbulenzEngine.flush();
    },

    update: function()
    {
        ClipJump.Entity.update(this);
        ClipJump.Object.update(this);

        this.camera.update();
    },

    render: function()
    {
    }
};

ClipJump.create = function()
{
    var game = new ClipJump();
    game.start();
    return ClipJump.instance = game;
};


/**
 * ClipJump.Camera
 * Camera control & update
 */
ClipJump.Camera = function()
{
    var mathDevice = WebGLMathDevice;
    var v3Build = mathDevice.v3Build;

    // Camera looks along -ive z direction towards origin - has 60 degree FOV
    var cameraPosition = v3Build.call(mathDevice, -0.5, -25.0, 25.0);
    var cameraTarget = v3Build.call(mathDevice, -0.5, 0.0, 0.0);
    var worldUp = v3Build.call(mathDevice, 0.0, 1.0, 0.0);
    var halfFov = Math.tan(30 * (Math.PI / 180));
    var camera = Camera.create(mathDevice);

    camera.recipViewWindowX = (1.0 / halfFov);
    camera.recipViewWindowY = (1.0 / halfFov);
    camera.updateProjectionMatrix();
    camera.lookAt(cameraTarget, worldUp, cameraPosition);
    camera.updateViewMatrix();

    this.camera = camera;
};

ClipJump.Camera.prototype.get = function(){return this.camera;};

ClipJump.Camera.prototype.update = function()
{
    var camera = this.camera;
    var graphicsDevice =WebGLGraphicsDevice;
    var deviceWidth = graphicsDevice.width;
    var deviceHeight = graphicsDevice.height;
    var aspectRatio = (deviceWidth / deviceHeight);

    if (aspectRatio !== camera.aspectRatio) {
        camera.aspectRatio = aspectRatio;
        camera.updateProjectionMatrix();
    }
    camera.updateViewProjectionMatrix();
};


/**
 * ClipJump.Entity
 */
ClipJump.Entity = function(){};

ClipJump.Entity.update = function(game){};

/**
 * ClipJump.Object
 */
ClipJump.Object = function(){};

ClipJump.Object.update= function(game){};

/**
 * ClipJump.Map
 * @param {object} options [map default options]
 */
ClipJump.Map = function(opts){};

