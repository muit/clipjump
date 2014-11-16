/*{# Copyright (c) 2013-2014 Turbulenz Limited #}*/

/*global TurbulenzEngine: false*/
/*global Application: false*/
/*global Protolib: false*/

/*{% if tz_development %}*/
/*{{ javascript('scripts/configdebug.js') }}*/
/*{% elif not tz_development %}*/
/*{{ javascript('scripts/configrelease.js') }}*/
/*{% endif %}*/

/*{{ javascript('jslib/aabbtree.js') }}*/
/*{{ javascript('jslib/assettracker.js') }}*/
/*{{ javascript('jslib/camera.js') }}*/
/*{{ javascript('jslib/draw2d.js') }}*/
/*{{ javascript('jslib/effectmanager.js') }}*/
/*{{ javascript('jslib/fontmanager.js') }}*/
/*{{ javascript('jslib/forwardrendering.js') }}*/
/*{{ javascript('jslib/geometry.js') }}*/
/*{{ javascript('jslib/indexbuffermanager.js') }}*/
/*{{ javascript('jslib/light.js') }}*/
/*{{ javascript('jslib/loadingscreen.js') }}*/
/*{{ javascript('jslib/material.js') }}*/
/*{{ javascript('jslib/observer.js') }}*/
/*{{ javascript('jslib/renderingcommon.js') }}*/
/*{{ javascript('jslib/requesthandler.js') }}*/
/*{{ javascript('jslib/resourceloader.js') }}*/
/*{{ javascript('jslib/scene.js') }}*/
/*{{ javascript('jslib/scenenode.js') }}*/
/*{{ javascript('jslib/shadermanager.js') }}*/
/*{{ javascript('jslib/shadowmapping.js') }}*/
/*{{ javascript('jslib/soundmanager.js') }}*/
/*{{ javascript('jslib/texturemanager.js') }}*/
/*{{ javascript('jslib/utilities.js') }}*/
/*{{ javascript('jslib/vertexbuffermanager.js') }}*/
/*{{ javascript('jslib/vmath.js') }}*/

/*{{ javascript('jslib/services/gamesession.js') }}*/
/*{{ javascript('jslib/services/mappingtable.js') }}*/
/*{{ javascript('jslib/services/turbulenzbridge.js') }}*/
/*{{ javascript('jslib/services/turbulenzservices.js') }}*/

/*{{ javascript('protolib/debugdraw.js') }}*/
/*{{ javascript('protolib/duimanager.js') }}*/
/*{{ javascript('protolib/jqueryextend.js') }}*/
/*{{ javascript('protolib/protolib.js') }}*/
/*{{ javascript('protolib/sceneloader.js') }}*/
/*{{ javascript('protolib/simplefonts.js') }}*/
/*{{ javascript('protolib/simplesceneloader.js') }}*/
/*{{ javascript('protolib/simplesprite.js') }}*/
/*{{ javascript('protolib/soundsourcemanager.js') }}*/

/*{{ javascript('scripts/clipjump.js') }}*/

TurbulenzEngine.onload = function onloadFn()
{
    var protolibConfig = ClipJump.prototype.protolibConfig || {},
        intervalID;

    protolibConfig.onInitialized = function onInitializedFn(protolib)
    {
        var game = ClipJump.create(null);
        if (!game)
        {
            if (window.console)
                window.console.error("Application not created correctly, make sure Protolib is initialized correctly");
            return;
        }

        intervalID = TurbulenzEngine.setInterval(function ()
        {
            game.update();
        }, 1000 / (protolibConfig.fps || 60));

        TurbulenzEngine.onunload = function onUnloadFn()
        {
        };

    };
    Protolib.create(protolibConfig);
};
